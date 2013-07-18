/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 *  Contributor(s):
 *  - LouCypher (original code)
 */

// ==UserScript==
// @id              untiny.me@loucypher
// @name            untiny.me
// @namespace       http://userscripts.org/users/12
// @description     Expand short URL with untiny.me when hover on a link.
// @version         1.0b1
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://raw.github.com/LouCypher/userscripts/master/untiny.me/untiny.me-48.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/untiny.me/untiny.me-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?untiny+me
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/untiny.me
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/untiny.me/untiny.me.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/untiny.me/untiny.me.user.js
// @resource        icon https://raw.github.com/LouCypher/userscripts/master/untiny.me/untiny.me-16.png
// @resource        services https://raw.github.com/LouCypher/userscripts/master/untiny.me/services.txt
// @resource        changelog https://raw.github.com/LouCypher/userscripts/master/untiny.me/CHANGELOG.txt
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @include         *
// @grant           GM_registerMenuCommand
// @grant           GM_getResourceText
// @grant           GM_getResourceURL
// @grant           GM_xmlhttpRequest
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_log
// ==/UserScript==

var regx = new RegExp("^https?:\/\/(" + GM_getResourceText("services") + ")(?=\/[a-z0-9_]+)", "i");
if (!regx.test(location.href)) {
  GM_addStyle('a.untinyUserJS{cursor:url("' + GM_getResourceURL("icon") + '") 8 0, progress}');

  document.addEventListener("mouseover", function(e) {
    var node = e.target;

    while (node && node.nodeName != "A")
      node = node.parentNode;

    // Facebook
    if (node && /LinkshimAsyncLink.swap/.test(node.onmouseover)) {
      node.onmouseover = null;
      node.onclick = null;
    }

    if (node && node.nodeName === "A" && regx.test(node.href)) {
      extract(node, node.href);
    }
  })

  // Toggle debugging on/off
  GM_registerMenuCommand("untiny.me: Debug", function() {
    var debug = GM_getValue("debug", false);
    GM_setValue("debug", !debug);
    alert("untiny.me\nDebugging is " + (!debug ? "ON" : "OFF"));
  })
}

// Extract short URL
function extract(aNode, aURL) {
  aNode.classList.add("untinyUserJS");
  var log = "Short URL: " + aURL + "\n";
  var msg = "";

  if (/^https:\/\/t.co\//.test(aURL))
    aURL = aURL.replace(/^https/, "http");

  GM_xmlhttpRequest({
    method: "GET",
    url: "http://untiny.me/api/1.0/extract/?format=text&url=" + encodeURIComponent(aURL),
    timeout: 10000,

    ontimeout: function(req) {
      aNode.classList.remove("untinyUserJS");
      msg += "Request timeout!";
      log += msg;
      alert(msg);
      throw log;
    },

    onerror: function(req) {
      aNode.classList.remove("untinyUserJS");
      msg += aReq.status ? aReq.status + " error" : "Connection error";
      log += msg;
      alert(msg);
      throw log;
    },

    onreadystatechange: function(req) {
      if (req.readyState == 4 && req.status == 200) {
        var responseText = req.responseText;

        if (!/^(http|ftp)s?:\/\//.test(responseText)) {
          aNode.classList.remove("untinyUserJS");
          throw log + responseText;
        }

        // Re-request if original URL is another short URL
        if (regx.test(responseText)) {
          log += "Original URL: " + responseText;
          debug(log);
          return extract(aNode, responseText);
        }

        aNode.classList.remove("untinyUserJS");
        aNode.href = responseText;
        if (aNode.hasAttribute("title") && aNode.title === aURL)
          aNode.title = responseText;
        log += "Original URL: " + responseText;
        debug(log);
      }
    }
  })
}

function debug(aString) {
  GM_getValue("debug", false) && GM_log(aString);
}

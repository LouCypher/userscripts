/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              greasy-fork-more-install-button@loucypher
// @name            Greasy Fork - More Install button
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add install button on script Code, Versions and Feedback page.
// @version         2.0
// @author          LouCypher
// @license         WTFPL
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Greasy+Fork+-+More+Install+button
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/greasyfork/install-button
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/greasyfork/install-button/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/greasyfork/install-button/userscript.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/greasyfork/install-button/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://greasyfork.org/scripts/*/code
// @include         https://greasyfork.org/scripts/*/versions
// @include         https://greasyfork.org/scripts/*/feedback
// @grant           none
// ==/UserScript==

var blocked = /\/scripts\/(94|115|116|117|119|120|121|122|123|172)\//;
var header, title;
header = document.querySelector("#script-info header")
if (header)
  title = header.querySelector("h2");

if (title) {
  /* Get CSRF authenticity token */
  var csrfToken = document.head.children["csrf-token"];
  var authToken = csrfToken ? "?authenticity_token=" +
                              encodeURIComponent(csrfToken.content)
                            : null;

  /* Add Install button */
  var scriptId = location.href.match(/\d+/);
  var span = header.insertBefore(document.createElement("span"), title);
  var link = span.appendChild(document.createElement("a"));
  link.href = "/scripts/" + scriptId + "/code.user.js";
  link.dataset.pingUrl = "/scripts/" + scriptId + "/install-ping"
                       + (authToken ? authToken : "");
  link.textContent = "Install";
  link.className = "install-link";
  link.style.cssFloat = "right";

  if (blocked.test(location.href)) {
    link.href = "/scripts/under-assessment";
    link.style.backgroundColor = "maroon";
    link.addEventListener("click", function(aEvent) {
      aEvent.preventDefault();
      alert("This script is currently under review");
    });
  }
}

else
  throw new Error("Sam Ting Wen Wong!");  // Terminate

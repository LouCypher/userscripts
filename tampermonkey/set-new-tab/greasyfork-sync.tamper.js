// ==UserScript==
// @id              chrome-newtab@loucypher
// @name            Google Chrome - Set New Tab
// @namespace       https://github.com/LouCypher/userscripts
// @description     Set a specified URL as new tab page on Google Chrome.
// @version         1.0
// @author          LouCypher
// @license         MIT License
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Google+Chrome+-+Set+New+Tab
// @homepageURL     https://greasyfork.org/scripts/217
// @supportURL      https://greasyfork.org/scripts/217/feedback
// @downloadURL     https://greasyfork.org/scripts/217/code.user.js
// @updateURL       https://greasyfork.org/scripts/217/code.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/tampermonkey/set-new-tab/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/tampermonkey/set-new-tab/LICENSE.txt
// @match           http://*/*
// @match           https://*/*
// @run-at          document-start
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_registerMenuCommand
// ==/UserScript==

if (/^https?:\/\/www.google.[a-z.]+\/\_\/chrome\/newtab.*/.test(location.href)) {
  document.documentElement.innerHTML = "<head></head><body></body>";
  location.replace(GM_getValue("newTabURL", "about:blank"));
}

GM_registerMenuCommand("Set new tab page", function() {
  var setCurrentPage = confirm("Use current page as new tab?\mPress 'Cancel' to enter URL");
  if (setCurrentPage)
    GM_setValue("newTabURL", location.href);
  else {
    var url = GM_getValue("newTabURL", "about:blank");
    var newTabURL = prompt("Enter URL as new tab.\nEnter 'about:blank' to use blank page", url);
    if (newTabURL)
      GM_setValue("newTabURL", newTabURL);
  }
});

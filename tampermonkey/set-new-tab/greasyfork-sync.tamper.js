// ==UserScript==
// @id              chrome-newtab@loucypher
// @name            Google Chrome - Set New Tab
// @namespace       https://github.com/LouCypher/userscripts
// @description     Set a specified URL as new tab page on Google Chrome.
// @version         2.1
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

const REGEXP = /^https?:\/\/www.google.[a-z.]+\/\_\/chrome\/newtab.*/;
var isDefaultNewTab = REGEXP.test(top.location.href);

function setNewTabURL(aURL, aMsg) {
  var message = "Enter URL as new tab.\n" +
                "Enter 'about:blank' to use a blank page.\n" +
                "Enter empty string to use browser default.";
  if (aMsg)
    message = aMsg + "\nor\n" + message;

  if (isDefaultNewTab)
    aURL = "";

  var newTabURL = prompt(message, aURL);
  if (newTabURL || newTabURL === "")
    GM_setValue("newTabURL", newTabURL);
}

if (isDefaultNewTab) {
  var newTabURL = GM_getValue("newTabURL", "");
  if (newTabURL) {
    stop(); // in the name of love
    document.documentElement.innerHTML = "<head></head><body></body>";
    location.replace(newTabURL);
  }
}

GM_registerMenuCommand("New Tab: set a new location", function() {
  setNewTabURL(GM_getValue("newTabURL", ""));
});

if (!isDefaultNewTab) {
  GM_registerMenuCommand("New Tab: use current page", function() {
    setNewTabURL(top.location.href, "Press 'OK' to use current page");
  });
}

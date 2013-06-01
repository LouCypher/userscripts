// ==UserScript==
// @id              filefolks-x-adblock@loucypher
// @name            Filefolks x Adblock
// @namespace       http://userscripts.org/users/12
// @description     Bypass anti-adblock on uptobox.com.
// @version         0.0
// @author          LouCypher
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Filefolks+x+Adblock
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/filefolks-x-adblock
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/filefolks-x-adblock.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/filefolks-x-adblock.user.js
// @run-at          document-start
// @include         http://www.filefolks.com/*
// @include         http://filefolks.com/*
// @grant           unsafeWindow
// ==/UserScript==

unsafeWindow.awm = true;

if ("onbeforescriptexecute" in window) {
  window.addEventListener("beforescriptexecute", function(aEvent) {
    var script = aEvent.target;
    if (!script.src && script.textContent == "awm = false;") {
      window.removeEventListener(aEvent.type, arguments.callee, true);
      aEvent.preventDefault();
    }
  }, true)
}

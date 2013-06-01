// ==UserScript==
// @id              filefolks-x-adblock@loucypher
// @name            Filefolks x Adblock
// @namespace       http://userscripts.org/users/12
// @description     Bypass anti-adblock on filefolks.com.
// @version         0.0.2
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

var scripts = 2; // Number of scripts to be blocked

if ("onbeforescriptexecute" in window) {
  window.addEventListener("beforescriptexecute", function(aEvent) {
    var script = aEvent.target;
    var source = script.src;
    if ((source && /loxtk.com/.test(source)) ||
        (!source && script.textContent == "awm = false;")) {
      scripts--;
      aEvent.preventDefault();
    }
    if (scripts === 0)
      window.removeEventListener(aEvent.type, arguments.callee, true);
  }, true)
}

document.addEventListener("DOMContentLoaded", function() {
  var noscript = document.querySelector("h2 noscript");
  noscript && noscript.parentNode.removeChild(noscript);
}, false)

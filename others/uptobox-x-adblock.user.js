// ==UserScript==
// @name            uptobox x adblock
// @namespace       http://kask.us/gVMKK
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/uptobox-x-adblock.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/uptobox-x-adblock.user.js
// @include         http://uptobox.com/*
// @run-at          document-start
// @grant           none
// ==/UserScript==

window.addEventListener("beforescriptexecute", function(e) {
  if (/Missclick/.test(e.target.textContent)) {
    window.removeEventListener(e.type, arguments.callee, true);
    e.preventDefault();
  }
}, true)
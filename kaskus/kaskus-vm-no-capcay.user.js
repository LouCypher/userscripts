/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name              Kaskus - VM No Capcay
// @id                kaskus-vm-no-capcay@loucypher
// @namespace         http://userscripts.org/users/12
// @version           1.2
// @author            LouCypher
// @license           WTFPL
// @icon              http://loucypher.github.io/userscripts/kaskus/kaskus-48.png
// @icon64URL         http://loucypher.github.io/userscripts/kaskus/kaskus-64.png
// @contributionURL   http://loucypher.github.io/userscripts/donate.html?Kaskus+-+VM+No+Capcay
// @homepageURL       https://github.com/LouCypher/userscripts/tree/master/kaskus
// @supportURL        https://github.com/LouCypher/userscripts/issues
// @downloadURL       https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-vm-no-capcay.user.js
// @updateURL         https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-vm-no-capcay.user.js
// @resource          LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include           /^https?:\/\/www\.kaskus\.co\.id\/(profile(\/[0-9]+)?\/?$|visitormessage\/conversation/.*)/
// @run-at            document-start
// @grant             none
// ==/UserScript==

var proc = 0;

window.addEventListener("beforescriptexecute", function(e) {
  if (proc === 4) {
    window.removeEventListener(e.type, arguments.callee, true);
  }
  var script = e.target;
  if (/recaptcha/i.test(script.src) ||
      /recaptcha/i.test(script.textContent)) {
    proc++;
    e.stopPropagation();
    e.preventDefault();
  }
}, true)
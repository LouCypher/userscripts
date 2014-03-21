/**
 * Blok script Telkom Speedy user script
 * Licensed under the MIT license
 *
 * Copyright (c) 2014 LouCypher.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 **/

// ==UserScript==
// @id              telkom-fucking-speedy@loucypher
// @name            Blok script Telkom Speedy
// @namespace       https://github.com/LouCypher/userscripts
// @description     [Firefox only] Blok script yang diinjeksi oleh Telkom @(#*!& Speedy (PT Telekomunikasi Indonesia Tbk).
// @version         1.0
// @author          LouCypher
// @license         MIT License
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Block+Telkom+Speedy+injected+script
// @homepageURL     https://greasyfork.org/scripts/204
// @supportURL      https://greasyfork.org/scripts/204/feedback
// @downloadURL     https://greasyfork.org/scripts/204/code.user.js
// @updateURL       https://greasyfork.org/scripts/204/code.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/telkom-speedy/block-scripts/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/telkom-speedy/block-scripts/LICENSE.txt
// @include         http://*
// @run-at          document-start
// @grant           none
// ==/UserScript==

function blockScript(aEvent) {
  var script = aEvent.target;
  if (!script.src && /cfs.u\-ad.info.*\&amp\;enc\=telkom2/.test(script.textContent)) {
    console.log("Telkom Speedy script found!");
    aEvent.preventDefault();
    window.removeEventListener(aEvent.type, arguments.callee, true);
  }
}

function removeElement() {
  var noScripts = document.body.querySelectorAll("script:not([src]) + noscript");
  if (noScripts.length) {
    for (var i = 0; i < noScripts.length; i++) {
      if (noScripts[i].textContent === "activate javascript") {
        console.log("Telkom Speedy element found!");
        document.body.removeChild(noScripts[i]);
        return;
      }
    }
  }
}

window.addEventListener("beforescriptexecute", blockScript, true);
document.addEventListener("DOMContentLoaded", removeElement);

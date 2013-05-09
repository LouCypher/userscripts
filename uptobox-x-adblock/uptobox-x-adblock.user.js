/*
    Bypass anti-adblock on uptobox.com.
    Copyright (C) 2013 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @id              uptobox-x-adblock@loucypher
// @name            Uptobox x Adblock
// @namespace       http://kask.us/gVMKK
// @description     Bypass anti-adblock on uptobox.com.
// @version         1.0
// @author          LouCypher
// @contributor     coolkips
// @license         GPL
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Uptobox+x+Adblock
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/uptobox-x-adblock
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/uptobox-x-adblock.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/uptobox-x-adblock.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/changelog.txt
// @run-at          document-start
// @include         http://uptobox.com/*
// @grant           none
// ==/UserScript==

window.addEventListener("beforescriptexecute", function(e) {
  if (/Missclick/.test(e.target.textContent)) {
    window.removeEventListener(e.type, arguments.callee, true);
    e.preventDefault();
  }
}, true)
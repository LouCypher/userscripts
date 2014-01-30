/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            GitHub - Open Source Report Card
// @namespace       https://userscripts.org/users/12
// @version         1.0
// @author          LouCypher
// @license         WTFPL
// @icon            https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/icon48.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/icon64.png
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/screenshot.jpg
// @contributionURL http://loucypher.github.io/userscripts/donate.html?GitHub+Open+Source+Report+Card
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/github/open-source-report-card
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/userscript.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://github.com/*
// @grant           none
// ==/UserScript==

var user = document.querySelector(".column-sec.vcard .vcard-username");
var vcard = document.querySelector(".column-sec.vcard .vcard-details");
if (user && vcard) {
  var list = document.createElement("li");
  list.className = "vcard-detail";
  list.innerHTML = '<span class="octicon octicon-graph"></span>'
                 + '<a href="http://osrc.dfm.io/' + user.textContent
                 + '?ref=userscript">Open Source Report Card</a>';
  /*var last = vcard.querySelector("li.vcard-detail:last-child")
  vcard.insertBefore(list, last);*/
  vcard.appendChild(list);
}

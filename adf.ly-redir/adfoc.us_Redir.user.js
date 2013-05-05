/*
    Redirect adfoc.us to its target location.
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
// @name            adfoc.us Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect adfoc.us to its target location.
// @version         1.0
// @author          LouCypher
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/adf.ly-redir
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/adfoc.us_Redir.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/adfoc.us_Redir.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://adfoc.us/*
// @grant           none
// ==/UserScript==

var xpath = "/html/body/script[not(@src) and text()[contains(.,'var click_url =')]]";
var script = document.evaluate(xpath, document, null, 9, null).singleNodeValue;
if (script) {
  document.title = document.body.innerHTML = "Redirecting\u2026";
  location.replace(script.textContent.match(/\svar click_url.*(?=")/).toString().split('"')[1])
}
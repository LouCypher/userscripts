/*
    Redirect LNX.lu to its target location.
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
// @name            LNX.lu Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect LNX.lu to its target location.
// @version         1.0
// @author          LouCypher
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/adf.ly-redir
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/lnx.lu_Redir.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/lnx.lu_Redir.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://lnx.lu/*
// @include         http://z.gs/*
// ==/UserScript==

(function() {
  var link = document.querySelector("#clickbtn > a[href^='/?click=']");
  if (link) {
    document.title = "Redirecting to " + document.title;
    document.body.innerHTML = "Redirecting\u2026";
    location.replace(link.href);
  }
})()
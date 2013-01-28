/*
    Redirect LinkBucks to its target location.
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
// @name            LinkBucks Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect LinkBucks to its target location.
// @version         1.0
// @author          LouCypher
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/adf.ly-redir
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/linkbucks-redir.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/linkbucks-redir.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         http://*.linkbucks.com/
// ==/UserScript==

(function() {
  var scripts = document.querySelectorAll("body > script:not([src])");
  if (!scripts.length) return;
  document.body.innerHTML = document.title = "Redirecting\u2026";
  var regx = /TargetUrl.*\'http.*(?=')/
  for (var i = 0; i < scripts.length; i++) {
    if (regx.test(scripts[i].textContent)) {
      var targetURL = scripts[i].textContent.match(regx).toString()
                                .replace(/TargetUrl.*\'/, "");
      location.replace(targetURL);
      return;
    }
  }
})()
/*
    Redirect adf.ly to its target location.
    Copyright (C) 2012 LouCypher

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
// @name            adf.ly Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect adf.ly to its target location.
// @version         4.0
// @author          LouCypher
// @license         GPL
// @updateURL       https://userscripts.org/scripts/source/141047.meta.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/adf.ly-redir/LICENSE.txt
// @include         http://adf.ly/*
// @include         http://j.gs/*
// @include         http://q.gs/*
// @include         http://9.bb/*
// @include         http://u.bb/*
// @exclude         http://*/go/*
// @grant           none
// ==/UserScript==

(function() {
  if (/blocked/.test(location.pathname)) {
    redir(sessionStorage.getItem("adfly_redirURL"));
    return;
  }
  var script = document.head.querySelector("script:not([src])");
  if (!script) return;
  var url = script.textContent.match(/\/go\/.*(?=')/);
  if (!url) return;
  url = url.toString();
  sessionStorage.setItem("adfly_redirURL", url);
  redir(url);
  function redir(aURL) {
    document.title = "Redirecting\u2026";
    document.body.textContent = document.title;
    location.replace("http://adf.ly" + aURL);
  }
})()
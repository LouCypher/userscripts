/*
    Add Tumview.com link on Tumblr sites and vice versa.
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
// @name            Tumblr Tumview Linker
// @namespace       http://userscripts.org/users/12
// @description     Add Tumview.com link on Tumblr sites and vice versa.
// @version         3.0.1
// @author          LouCypher
// @license         GPL
// @homepageURL     https://userscripts.org/scripts/show/158464
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// !resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.txt
// @include         *
// @grant           none
// ==/UserScript==

(function() {
  if (window.top === window.self) {
    var tumblr = document.getElementById("tumblr_controls");
    if (!tumblr) return;
    if (getComputedStyle(tumblr, null).display === "none") {
      tumblr.style.setProperty("display", "block", "important");
    }
    return;
  }

  var name, link;

  if (/(www|assets).tumblr.com\/(dashboard\/)?iframe(.html)?/.test(location.href)) {
    name = getName(/&name=[A-Za-z0-9_-]+/);
    if (!name) return;
    link = addLink("Tumview", "http://tumview.com/" + name);
    link.className = "btn";
    link.style.cssFloat = "right";
    link.title = "View photos from this site on Tumview.com";
    var body = document.body;
    var div = document.querySelector("div.iframe_controls");
    if (body.classList.contains("version_pill")) {
      div.insertBefore(link, div.querySelector("a:last-child"));
    } else {
      div.style.display = "none";
      body.classList.add("version_pill");
      body.appendChild(link);
    }

  } else if (/tumview.com\/assets\/top.php/.test(location.href)) {
    name = getName(/&pagename=[A-Za-z0-9_-]+/);
    if (!name) return;
    var title = document.querySelector("#left > h1");
    if (!title) return;
    link = addLink("Tumblr", "http://" + name + ".tumblr.com/");
    title.appendChild(document.createTextNode("@"));
    title.appendChild(link);
    var tag = getName(/&tag=[A-Za-z0-9_-]+/);
    if (tag) link.href += "tagged/" + tag;
  }

  function getName(aRexExp) {
    var name = location.search.match(aRexExp);
    if (!name) return null;
    return name.toString().split("=")[1];
  }

  function addLink(aText, aURL) {
    var link = document.createElement("a");
    link.textContent = aText;
    link.href = aURL;
    link.target = "_top";
    return link;
  }
})()
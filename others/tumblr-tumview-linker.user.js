/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            Tumblr Tumview Linker
// @namespace       http://userscripts.org/users/12
// @description     Add Tumview.com link on Tumblr sites. Works on custom domains.
// @version         2.2
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @homepageURL     https://userscripts.org/scripts/show/158464
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://www.tumblr.com/dashboard/iframe*
// @include         http://assets.tumblr.com/iframe.html*
// @include         http://tumview.com/assets/top.php?*
// @grant           none
// ==/UserScript==

(function() {

  var name;

  if (/tumblr.com$/.test(location.hostname)) {
    name = getName(/&name=[A-Za-z0-9_-]+/);
    if (!name) return;
    var link = addLink("Tumview", "http://tumview.com/" + name);
    link.className = "btn icon show_admin";
    link.title = "View photos from this site on Tumview.com";
    var div = document.querySelector("div.iframe_controls");
    var join = document.getElementById("btn_join");
    if (join) {
      div.insertBefore(link, join);
      link.style.cssFloat = "right";
    } else {
      div.appendChild(link);
    }

  } else if (location.hostname === "tumview.com") {
    name = getName(/&pagename=[A-Za-z0-9_-]+/);
    if (!name) return;
    var title = document.querySelector("#left > h1");
    if (!title) return;
    title.appendChild(document.createTextNode("@"));
    title.appendChild(addLink("Tumblr", "http://" + name + ".tumblr.com"));
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
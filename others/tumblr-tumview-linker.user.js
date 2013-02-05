/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            Tumblr Tumview Linker
// @namespace       http://userscripts.org/users/12
// @description     Add Tumview.com link on Tumblr sites. Works on custom domains.
// @version         1.1
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @homepageURL     https://userscripts.org/users/12/scripts
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/tumblr-tumview-linker.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://www.tumblr.com/dashboard/iframe*
// @include         http://assets.tumblr.com/iframe.html*
// @grant           none
// ==/UserScript==

(function() {
  var name = location.search.match(/&name=[A-Za-z0-9_-]+/);
  if (name) {
    name = name.toString().split("=")[1];
    var link = document.createElement("a");
    link.className = "btn join";
    link.href = "http://tumview.com/" + name;
    link.target = "_top";
    link.title = "View photos from this site on Tumview.com";
    link.textContent = "Tumview";
    var div = document.querySelector("div.iframe_controls");
    var join = document.getElementById("btn_join");
    if (join) {
      div.insertBefore(link, join);
    } else {
      div.appendChild(link);
    }
  }
})()
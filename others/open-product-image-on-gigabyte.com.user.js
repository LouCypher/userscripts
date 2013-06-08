/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            Open product image on gigabyte.com
// @namespace       http://userscripts.org/users/12
// @license         WTFPL http://www.wtfpl.net/
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/open-product-image-on-gigabyte.com.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/open-product-image-on-gigabyte.com.user.js
// @include         http://www.gigabyte.com/products/product-page.aspx?*pid=*
// @grant           none
// ==/UserScript==

var photolist = document.getElementById("photolist");
if (photolist) {
  var imgsrc, links = photolist.querySelectorAll("a.photo_tn");
  for (var i = 0; i < links.length; i++) {
    imgsrc = links[i].nextSibling.value;
    links[i].href = imgsrc.replace(/\_m(?=.\w+$)/, "_big");
    links[i].removeAttribute("onclick");
  }
}

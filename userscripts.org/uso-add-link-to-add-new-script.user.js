/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            USO: Add link to add a new script
// @namespace       http://userstyles.org/users/12
// @version         1.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/userscripts.org/uso-add-link-to-add-new-script.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/userscripts.org/uso-add-link-to-add-new-script.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         *://userscripts.org/home/scripts
// @include         *://userscripts.org/users/*
// @match           *://userscripts.org/home/scripts
// @match           *://userscripts.org/users/*
// ==/UserScript==

(function() { // function wrapper for Opera UserJS
  var upload = document.querySelector("a[href='/scripts/new']");
  if (!upload) return;

  var img = upload.querySelector("img");
  if (img) {
    upload.parentNode.insertBefore(img, upload);
    img.parentNode.insertBefore(document.createTextNode(" "), upload);
  }

  var add = document.createElement("a");
  add.setAttribute("href", "/scripts/new?form=true");
  add.textContent = "Add";

  upload.textContent = "upload";
  upload.parentNode.appendChild(document.createTextNode(" a new script"));
  upload.parentNode.insertBefore(add, upload);
  upload.parentNode.insertBefore(document.createTextNode(" or "), upload);

})()
/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name          USO: Add link to add a new script
// @namespace     http://userstyles.org/users/12
// @version       0.0
// @author        LouCypher
// @license       WTFPL http://sam.zoy.org/wtfpl/COPYING
// @include       *://userscripts.org/home/scripts
// @include       *://userscripts.org/users/*
// @match         *://userscripts.org/home/scripts
// @match         *://userscripts.org/users/*
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
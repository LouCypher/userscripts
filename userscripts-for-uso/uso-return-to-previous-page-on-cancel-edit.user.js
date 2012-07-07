/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name          USO: Go back or close window on cancel editing script
// @namespace     http://userstyles.org/users/12
// @description   Go back or close window if editing script source or description is cancelled
// @version       0.0
// @author        LouCypher
// @license       WTFPL http://sam.zoy.org/wtfpl/COPYING
// @include       *://userscripts.org/scripts/edit/*
// @include       *://userscripts.org/scripts/edit_src/*
// @match         *://userscripts.org/scripts/edit/*
// @match         *://userscripts.org/scripts/edit_src/*
// ==/UserScript==

(function() { // function wrapper for Opera UserJS
  var cancel = document.querySelector("#content > .admin_section > form a");
  if (document.referrer != "") cancel.href = document.referrer;
  var text = " and " + ((history.length > 1) ? "return to previous page"
                                             : "close this window/tab");
  cancel.parentNode.appendChild(document.createTextNode(text));
  cancel.addEventListener("click", function(e) {
    e.preventDefault();
    if (history.length > 1) history.go(-1); // Return to previous page
    else close(); // Close window/tab
  }, false);
})()
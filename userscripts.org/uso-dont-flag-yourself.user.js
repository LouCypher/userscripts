/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name          USO: Don't flag yourself
// @namespace     http://userscripts.org/users/12
// @description   Remove 'Flag Spam' button from your own posts
// @version       1.1
// @author        LouCypher
// @license       WTFPL http://sam.zoy.org/wtfpl/COPYING
// @updateURL     https://userscripts.org/scripts/source/138063.meta.js
// @include       https://userscripts.org/topics/*
// @include       http://userscripts.org/topics/*
// @include       http://userscripts.org./topics/*
// @include       http://greasefire.userscripts.org/topics/*
// @include       http://greasefire.userscripts.org./topics/*
// ==/UserScript==

(function() {
  var loggedin = document.querySelector(".login_status a[href^='/home']");
  if (!loggedin) return;  // Not logged in.

  var users = document.querySelectorAll(".author.vcard a[user_id]");
  if (!users.length) return;

  var form;
  for (var i = 0; i < users.length; i++) {
    if (users[i].textContent == loggedin.textContent) {
      form = users[i].parentNode.parentNode.querySelector("form[action='/spam']");
      form.parentNode.removeChild(form);
    }
  }
})()
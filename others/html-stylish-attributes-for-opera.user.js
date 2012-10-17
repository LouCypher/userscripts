/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            HTML Stylish Attributes for Opera
// @namespace       http://userscripts.org/users/12
// @description     Add attributes to HTML element based on web site domain and URLs to use with Opera User CSS
// @author          LouCypher
// @version         1.0
// @license         WTFPL http://sam.zoy.org/wtfpl/
// @include         *
// ==/UserScript==

(function() {
  if (!frameElement && (typeof opera != "object")) {
    alert("HTML Stylish Attributes userscript\n" +
          "is only useful on Opera browser.");
  }
  var html = document.documentElement;
  html.setAttribute("stylish-url", location.href);
  html.setAttribute("stylish-scheme", location.protocol.match(/\w+/));
  html.setAttribute("stylish-domain", location.hostname);
  html.setAttribute("stylish-path", location.pathname);
})()
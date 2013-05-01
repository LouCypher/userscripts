/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              fontpark-direct-download@loucypher
// @name            fontpark direct download
// @namespace       http://userscripts.org/users/12
// @version         0.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/fontpark-direct-download.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/fontpark-direct-download.user.js
// @include         http://fontpark.net/*/font/*/
// @grant           none
// ==/UserScript==

var form = document.querySelector("form[method='post']");
var md5 = form.querySelector("input[name='zipscrt']");
if (form && md5) {
  form.method = "get";
  form.removeAttribute("target");
  md5.name = "zipmd5";
}
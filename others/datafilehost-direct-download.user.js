/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              datafilehost-direct-download@loucypher
// @name            datafilehost direct download
// @namespace       http://userscripts.org/users/12
// @version         0.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/datafilehost-direct-download.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/datafilehost-direct-download.user.js
// @include         http://*.datafilehost.com/*/*
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle("form[name='cbf']{display:none}form[name='cbf']+div{margin-top:1em}");
var fileId = location.pathname.match(/\w+$/);
var button = document.querySelector("#dl a");
if (button) button.href = "/get.php?file=" + fileId;
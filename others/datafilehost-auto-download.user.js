/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              datafilehost-auto-download@loucypher
// @name            datafilehost auto-download
// @namespace       http://userscripts.org/users/12
// @version         0.1
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/datafilehost-auto-download.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/datafilehost-auto-download.user.js
// @run-at          document-start
// @include         http://*.datafilehost.com/*/*
// @include         http://*.datafilehost.com/download-*.html
// @grant           none
// ==/UserScript==

var fileId = location.pathname.match(/\w+(?=.html$)/) ||
             location.pathname.match(/\w+$/);
location.pathname = "/get.php?file=" + fileId;
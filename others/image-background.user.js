/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            Single Image Background and Transparency
// @namespace       http://userscripts.org/users/12
// @description     Change single image background and show transparency
// @version         2.1
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/
// @homepageURL     https://github.com/LouCypher/userscripts
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/image-background.user.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/others/image-background.css
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @run-at          document-start
// @include         *
// @grant           GM_addStyle
// @grant           GM_getResourceText
// ==/UserScript==

/*
  Changelog:
  2.1 - Customizable color for background checkers in CSS
  2.0 - Using @resource for CSS
  1.0 - Initial release.
*/

if (!/^image\//.test(document.contentType)) return;
GM_addStyle(GM_getResourceText("css"));
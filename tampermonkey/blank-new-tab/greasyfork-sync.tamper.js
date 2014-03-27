/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              chrome-newtab-blank@loucypher
// @name            Google Chrome - Blank New Tab
// @namespace       https://github.com/LouCypher/userscripts
// @description     Use blank page as new tab on Google Chrome.
// @version         1.0
// @author          LouCypher
// @license         WTFPL
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Chrome+New+Tab+Blank
// @homepageURL     https://greasyfork.org/scripts/217
// @supportURL      https://greasyfork.org/scripts/217/feedback
// @downloadURL     https://greasyfork.org/scripts/217/code.user.js
// @updateURL       https://greasyfork.org/scripts/217/code.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/tampermonkey/blank-new-tab/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         /^https?://www\.google\.[a-z\.]+/\_/chrome/newtab.*/
// @run-at          document-start
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle("html{display:none}");
location.replace("about:blank");

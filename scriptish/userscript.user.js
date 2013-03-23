// ==UserScript==
// @name            _TEST: @require and @resource
// @namespace       http://userscripts.org/users/12
// @require         https://github.com/LouCypher/userscripts/raw/master/scriptish/require.js
// @resource        css https://github.com/LouCypher/userscripts/raw/master/scriptish/resource.css
// @include         about:blank
// @include         /^(https?|file|data):.*/
// @grant           GM_addStyle
// @grant           GM_getResourceText
// ==/UserScript==

adddiv(GM_addStyle, GM_getResourceText("css"))
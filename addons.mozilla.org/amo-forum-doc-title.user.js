// ==UserScript==
// @name           AMO Forum Document Title
// @namespace      loucypher@mozillaca.com
// @include        https://forums.mozilla.org/addons/*.php*
// @exclude        https://forums.mozilla.org/addons/index.php*
// ==/UserScript==

var title = document.title.replace(/\s\u2022.*\-\s/, "");
title = title.replace("Mozilla Add-ons Forum", "");

document.title = title + " \u2022 Mozilla Add-ons Forum";
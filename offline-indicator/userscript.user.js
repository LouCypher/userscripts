/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              offline-indicator@loucypher
// @name            Offline Indicator
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add icon to web page on bottom right as indicator when in offline mode.
// @version         2.1
// @author          LouCypher
// @contributor     Tango! Desktop Project (icon)
// @license         WTFPL
// @CSS-license     MIT License
// @SVG-license     Public domain
// @icon            https://raw.github.com/LouCypher/userscripts/master/offline-indicator/icon48.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/offline-indicator/icon64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Offline+Indicator
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/offline-indicator
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/offline-indicator/usercript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/offline-indicator/userscript.user.js
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/offline-indicator/offline-indicator.css
// @resource        SVG https://raw.github.com/LouCypher/userscripts/master/offline-indicator/offline-indicator.svg
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/offline-indicator/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         /^(https?|ftp|unmht):.*/
// @grant           GM_addStyle
// @grant           GM_getResourceURL
// @grant           GM_getResourceText
// ==/UserScript==

const DIV_ID = "offline-indicator";
const DIV_CLASS = "browser-is-offline";

function $(aId) {
  return document.getElementById(aId);
}

function toggleIndicator() {
  $(DIV_ID).classList.toggle(DIV_CLASS);
}

// Run on HTML document only
if (document instanceof HTMLDocument) {
  GM_addStyle(GM_getResourceText("CSS"));

  // Append <div> to <html> element
  var div = document.documentElement.appendChild(document.createElement("div"));
  div.id = DIV_ID;

  var img = div.appendChild(document.createElement("img"));
  img.src = GM_getResourceURL("SVG");
  if (typeof opera === "object")
    img.src = img.src.replace(/^data:/, "data:image/svg+xml");
  img.alt = img.title = "Working offline";

  if (!navigator.onLine)
    toggleIndicator();

  window.addEventListener("offline", toggleIndicator);
  window.addEventListener("online", toggleIndicator);
}

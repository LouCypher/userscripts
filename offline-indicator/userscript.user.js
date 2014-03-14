/**
 * Offline Indicator user script
 * Licensed under the MIT license
 *
 * Copyright (c) Zulkarnain K.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 **/

// ==UserScript==
// @id              offline-indicator@loucypher
// @name            Offline Indicator
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add icon to web page on bottom right as indicator when in offline mode.
// @version         3.0
// @author          LouCypher
// @contributor     Tango! Desktop Project (icon)
// @license         MIT License
// @SVG-license     Public domain
// @icon            https://raw.github.com/LouCypher/userscripts/master/offline-indicator/icon48.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/offline-indicator/icon64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Offline+Indicator
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/offline-indicator
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/offline-indicator/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/offline-indicator/userscript.user.js
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/offline-indicator/offline-indicator.css
// @resource        SVG https://raw.github.com/LouCypher/userscripts/master/offline-indicator/offline-indicator.svg
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/offline-indicator/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MIT/LICENSE.txt
// @include         /^(https?|ftp|unmht):.*/
// @grant           GM_addStyle
// @grant           GM_getResourceURL
// @grant           GM_getResourceText
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

const DIV_ID = "offline-indicator";
const DIV_CLASS = "browser-is-offline";
const ICON_TOP = "offline-indicator-icon-top";
const ICON_RIGHT = "offline-indicator-icon-right";
const ICON_BOTTOM = "offline-indicator-icon-bottom";
const ICON_LEFT = "offline-indicator-icon-left";

function $(aId) {
  return document.getElementById(aId);
}

function toggleIndicator() {
  $(DIV_ID).classList.toggle(DIV_CLASS);
}

function changePosition() {
  var div = $(DIV_ID);
  var isTop = div.classList.contains(ICON_TOP);
  var isRight = div.classList.contains(ICON_RIGHT);
  var isBottom = div.classList.contains(ICON_BOTTOM);
  var isLeft = div.classList.contains(ICON_LEFT);

  // If bottom-right, move to bottom-left
  if (isBottom && isRight) {
    div.classList.add(ICON_LEFT);
    div.classList.remove(ICON_RIGHT);
    GM_setValue("position", 1);
  }

  // If bottom-left, move to top-left
  else if (isBottom && isLeft) {
    div.classList.add(ICON_TOP);
    div.classList.remove(ICON_BOTTOM);
    GM_setValue("position", 2);
  }

  // If top-left, move to top-right
  else if (isTop && isLeft) {
    div.classList.add(ICON_RIGHT);
    div.classList.remove(ICON_LEFT);
    GM_setValue("position", 3);
  }

  // If top-right, move to bottom-right
  else if (isTop && isRight) {
    div.classList.add(ICON_BOTTOM);
    div.classList.remove(ICON_TOP);
    GM_setValue("position", 0);
  }
}

// Run on HTML document only and not in frame
if (document instanceof HTMLDocument && window.self === window.top) {
  GM_addStyle(GM_getResourceText("CSS"));

  // Append <div> to <html> element
  var div = document.documentElement.appendChild(document.createElement("div"));
  div.id = DIV_ID;

  var position = GM_getValue("position", 0);
  switch (position) {
    case 3:   // top-right
      div.classList.add(ICON_TOP);
      div.classList.add(ICON_RIGHT);
      break;
    case 2:   // top-left
      div.classList.add(ICON_TOP);
      div.classList.add(ICON_LEFT);
      break;
    case 1:   // bottom-left
      div.classList.add(ICON_BOTTOM);
      div.classList.add(ICON_LEFT);
      break;
    default:  // bottom-right
      div.classList.add(ICON_BOTTOM);
      div.classList.add(ICON_RIGHT);
  }

  var img = div.appendChild(document.createElement("img"));
  img.src = GM_getResourceURL("SVG");
  if (typeof opera === "object")
    img.src = img.src.replace(/^data:/, "data:image/svg+xml");
  img.alt = "Working offline"
  img.title = img.alt + "\nClick to change its position";
  img.addEventListener("click", changePosition);

  if (!navigator.onLine)
    toggleIndicator();

  window.addEventListener("offline", toggleIndicator);
  window.addEventListener("online", toggleIndicator);
}

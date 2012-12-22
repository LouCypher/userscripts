/*
    Standalone Image Background and Transparency
    Change standalone image background and show transparency on Firefox.
    Compatibility: Firefox 15.0 or newer.
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            Standalone Image Background and Transparency
// @namespace       http://userscripts.org/users/12
// @description     Change standalone image background and show transparency on Firefox. Use context menu to configure.
// @version         6.0a
// @author          LouCypher
// @license         GPL
// @screenshot      https://lh4.googleusercontent.com/-9mHK9gjsEd8/ULienLrrojI/AAAAAAAAC6Y/CoJitWWXsHc/s0/image-after.png
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/image-background
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js
// @require         https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/jscolor.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.css
// @resource        htmlElements https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.html
// @resource        changelog https://raw.github.com/LouCypher/userscripts/master/image-background/changelog.txt
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @run-at          document-start
// @include         *
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

if (!/^image\//.test(document.contentType)) return;

/***** Start checking preferences *****/
var bgColor = GM_getValue("bgColor", ""); // Get color value pref (def = empty)
var bgImage = GM_getValue("bgImage", true); // Get background pref (def = true)
var imgTrans = GM_getValue("imgTrans", true); // Get transparency pref (def = true)
/***** End checking preferences *****/

var html = document.documentElement;

setBgColor(bgColor); // Set background color from pref
setBgImage(bgImage); // Set background patters from pref
showTransparency(imgTrans); // Set image transparency from pref
GM_addStyle(GM_getResourceText("css")); // Inject style from @resource

if (!("contextMenu" in html && "HTMLMenuItemElement" in window)) return;

// Append HTML elements
var div = document.body.appendChild(document.createElement("div"));
div.innerHTML = GM_getResourceText("htmlElements");

jscolor.dir = "https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/";
$("color-picker").value = bgColor;

/***** Start context menu initialization *****/
// Check/uncheck menu items based on prefs
bgImage && $("toggle-background-image").setAttribute("checked", "true");
imgTrans && $("toggle-image-transparency").setAttribute("checked", "true");

// Add event listeners to menuitems
$("change-background-color").addEventListener("click", showColorConfig, false);
$("toggle-image-transparency").addEventListener("click", toggleTransparency, false);
$("toggle-background-image").addEventListener("click", toggleBgImage, false);

// Add event listeners to color configuration
$("color-picker").addEventListener("change", previewBgColor, false);
$("ok").addEventListener("click", saveBgColor, false);
$("cancel").addEventListener("click", resetBgColor, false);
$("default").addEventListener("click", defaultBgColor, false);

// Set context menu to html element
html.setAttribute("contextmenu", "context-menu");
/***** End context menu initialization *****/


// Check validity of color value
function validateColor(aColor, aCallback) {
  // Set dummy element color
  $("dummy").style.color = (aColor == "") ? "#222" : aColor;
  var save = false;

  if (getComputedStyle($("dummy"), null).color == "transparent") {
  // If dummy element's color is not set because invalid color value
    alert("Invalid color value!");
  } else {
    aCallback(aColor); // Run callback function
    save = true;
  }
  $("dummy").style.color = ""; // Reset dummy element's color
  return save;
}

// Set background color
function setBgColor(aColorValue) {
  if (aColorValue == "") {
    html.style.backgroundColor = ""; // Use default color from CSS resource
  } else {
    html.style.setProperty("background-color", aColorValue, "important");
  }
}

// Save color setting to preferences
function saveBgColor() {
  var color = $("color-picker").value;
  if (validateColor(color, setBgColor)) { // If color value is valid
    GM_setValue("bgColor", color); // Save color value to pref
    $("color-config").style.display = ""; // Hide dialog
  }
}

// Reset background color to previous setting
function resetBgColor() {
  html.style.setProperty("background-color", GM_getValue("bgColor", ""), "important");
  $("color-config").style.display = ""; // Hide dialog
}

// Use default background color
function defaultBgColor() {
  $("color-picker").value = "";
  html.style.backgroundColor = "";
}

// Show color configuration dialog
function showColorConfig() {
  $("color-picker").value = GM_getValue("bgColor", "");
  $("color-config").style.display = "block";
}

// Preview background color when chosing color in color picker
function previewBgColor(aEvent) {
  setBgColor(aEvent.target.value);
}

// Enable/disable background patterns
function setBgImage(aBoolean) {
  switch(aBoolean) {
    case true: // Enable background patterns
      html.style.backgroundImage = ""; // Use bg patterns in CSS resource
      break;
    case false: // Disable background patterns
      html.style.setProperty("background-image", "none", "important");
  }
  GM_setValue("bgImage", aBoolean); // Save background option to pref
}

// Toggle background patterns on/off
function toggleBgImage(aEvent) {
  setBgImage(aEvent.target.checked);
}

// Enable/disable image transparency
function showTransparency(aBoolean) {
  var styleId = "transparent-image";
  var style = null;
  switch (aBoolean) {
    case true: // Enable image transparency
      // Inject style
      style = document.head.appendChild(document.createElement("style"));
      style.textContent = "img { background-color: transparent !important; }";
      style.id = styleId;
      break;
    case false: // Disable image transparency
      style = $(styleId);
      style && style.parentNode.removeChild(style); // Remove style if exists
  }
  GM_setValue("imgTrans", aBoolean); // Save image transparency option to pref
}

// Toggle image transparency on/off
function toggleTransparency(aEvent) {
  showTransparency(aEvent.target.checked);
}

function $(aId) {
  return document.getElementById(aId);
}
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
// @version         6.0a9
// @author          LouCypher
// @license         GPL
// @screenshot      https://lh4.googleusercontent.com/-9mHK9gjsEd8/ULienLrrojI/AAAAAAAAC6Y/CoJitWWXsHc/s0/image-after.png
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/image-background
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js
// @require         https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/jscolor.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.css
// @resource        htmlElements https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.html
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        changelog https://raw.github.com/LouCypher/userscripts/master/image-background/changelog.txt
// @run-at          document-start
// @include         *
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_getResourceURL
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

if (!/^image\//.test(document.contentType)) return;

var html = document.documentElement;

/***** Start checking preferences *****/
var bgColor = GM_getValue("bgColor", ""); // Get color value pref (def = empty)
var bgImage = GM_getValue("bgImage", true); // Get background pref (def = true)
var imgTrans = GM_getValue("imgTrans", true); // Get transparency pref (def = true)
/***** End checking preferences *****/

setBgColor(bgColor); // Set background color from pref
setBgImage(bgImage); // Set background patters from pref
showTransparency(imgTrans); // Set image transparency from pref
GM_addStyle(GM_getResourceText("css")); // Inject style from @resource

if (!("contextMenu" in html && "HTMLMenuItemElement" in window)) return;

// Append elements
var div = document.body.appendChild(document.createElement("div"));
div.innerHTML = GM_getResourceText("htmlElements");

// Check if JavaScript is enabled for JSColor to work
if (getComputedStyle($("noscript"), null).display == "none") { // If JavaScript is enabled
  jscolor.dir = "https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/";
  $("color-picker").value = bgColor;
} else { // JavaScript is disabled
  jscolor.binding = false; // Disable color picker
  $("help").style.display = "inline";
  var p = $("color-config").querySelector("p");
  p.replaceChild(document.createTextNode("Enter valid "), p.firstChild);
}

/***** Start context menu initialization *****/
// Check/uncheck menu items based on prefs
bgImage && $("toggle-background-image").setAttribute("checked", "true");
imgTrans && $("toggle-image-transparency").setAttribute("checked", "true");

// Add event listeners to menuitems
$("change-background-color").addEventListener("click", showColorConfig, false);
$("toggle-image-transparency").addEventListener("click", toggleTransparency, false);
$("toggle-background-image").addEventListener("click", toggleBgImage, false);

// Set context menu to html element
html.setAttribute("contextmenu", "context-menu");
html.addEventListener("contextmenu", popupShowing, false);
/***** End context menu initialization *****/

// Color dialog initialization
html.addEventListener("click", hidePicker, false);
$("color-picker").addEventListener("mouseenter", showPicker, false);
$("color-picker").addEventListener("input", previewBgColor, false);
$("color-picker").addEventListener("change", previewBgColor, false);
$("ok").addEventListener("click", saveBgColor, false);
$("cancel").addEventListener("click", resetBgColor, false);
$("default").addEventListener("click", defaultBgColor, false);
$("help").addEventListener("click", showHelp, false);

// Executed on right click
function popupShowing(aEvent) {
  var node = aEvent.target;
  while (node && node.id != "color-config") node = node.parentNode;
  if (node) { // Color config dialog
    html.removeAttribute("contextmenu"); // Hide context menu items
  } else {
    html.setAttribute("contextmenu", "context-menu"); // Show context menu items
  }
}

// Check validity of color value
function validateColor(aColor, aCallback) {
  // Set dummy element color
  $("dummy").style.color = (aColor == "") ? "#222" : aColor;
  var save = false;

  if (getComputedStyle($("dummy"), null).color == "transparent") {
  // If dummy element's color is not set because invalid color value
    alert("Invalid color value: " + aColor);
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
    setStyleProperty(html, "background-color", aColorValue);
  }
}

// Save color setting to preferences
function saveBgColor() {
  var color = $("color-picker").value;
  if (validateColor(color, setBgColor)) { // If color value is valid
    GM_setValue("bgColor", color); // Save color value to pref
    hideColorConfig();
  }
}

// Reset background color to previous setting
function resetBgColor() {
  setStyleProperty(html, "background-color", GM_getValue("bgColor", ""));
  hideColorConfig();
}

// Use default background color
function defaultBgColor() {
  $("color-picker").value = "";
  html.style.backgroundColor = "";
}

// Show color configuration dialog
function showColorConfig() {
  $("change-background-color").disabled = true; // Disable menu item
  $("color-config").style.display = "block";
  $("color-picker").value = GM_getValue("bgColor", "");
  $("color-picker").focus();
}

// Hide color configuration dialog
function hideColorConfig() {
  ("color" in $("color-picker")) && $("color-picker").color.hidePicker();
  $("color-config").style.display = ""; // Hide dialog
  $("change-background-color").disabled = false; // Enable menu item
}

// Preview background color when chosing color in color picker
function previewBgColor(aEvent) {
  setBgColor(aEvent.target.value);
}

// Show color picker
function showPicker(aEvent) {
  ("color" in $("color-picker")) && $("color-picker").color.showPicker();
}

// Hide color picker
function hidePicker(aEvent) {
  var node = aEvent.target;
  if ((node.localName != "div") && !node.id && ("color" in $("color-picker"))) {
    $("color-picker").color.hidePicker();
  }
}

function showHelp() {
  var site = (location.protocol == "file:") ? "file://" : location.hostname;
  alert("Color picker requires JavaScript to be enabled.\n\n" +
        "You can still change the background color\n" +
        "by entering any valid color value.\n\n" +
        "If you have NoScript extension, color picker will work\n" +
        "if you click 'Allow " + site + "' on NoScript menu.");
}

// Enable/disable background patterns
function setBgImage(aBoolean) {
  switch(aBoolean) {
    case true: // Enable background patterns
      html.style.backgroundImage = ""; // Use bg patterns in CSS resource
      break;
    case false: // Disable background patterns
      setStyleProperty(html, "background-image", "none");
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

function setStyleProperty(aNode, aPropertyName, aValue) {
  aNode.style.setProperty(aPropertyName, aValue, "important");
}

function $(aId) {
  return document.getElementById(aId);
}
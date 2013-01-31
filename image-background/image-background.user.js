/*
    Change standalone image background and show its transparency on Firefox.
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
// @description     Change standalone image background and show its transparency on Firefox. Use context menu to configure.
// @version         7.2
// @author          LouCypher
// @license         GPL
// @screenshot      http://loucypher.github.com/userscripts/image-background/images/screenshot-after.png
// @icon            http://loucypher.github.com/userscripts/image-background/images/miku-icon48.png
// @icon64URL       http://loucypher.github.com/userscripts/image-background/images/miku-icon64.png
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/image-background
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js
// @require         https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/jscolor.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.css
// @resource        htmlElements https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.html
// @resource        thanks https://raw.github.com/LouCypher/userscripts/master/image-background/thanks.html
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        changelog https://raw.github.com/LouCypher/userscripts/master/image-background/changelog.txt
// @run-at          document-start
// @include         *
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_getResourceURL
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_openInTab
// ==/UserScript==

if (GM_getValue("firstTime", true)) { // If first time use
  showThanks(); // Open 'thank you' page
  GM_setValue("firstTime", false); // Don't open 'thank you' page again
}

var gDocElm = document.documentElement;
init();

function init() {
  if (!/^image\//.test(document.contentType)) {
    jscolor.binding = false; // Turn off JSColor on non-image page
    return;
  }

  /***** Start checking preferences *****/
  var bgColor = GM_getValue("bgColor", ""); // Get color value pref (def = empty)
  var bgImage = GM_getValue("bgImage", true); // Get background pref (def = true)
  var imgTrans = GM_getValue("imgTrans", true); // Get transparency pref (def = true)
  var computedColor = GM_getValue("computedColor", "");
  /***** End checking preferences *****/

  if (gDocElm instanceof SVGSVGElement) { // If SVG image
    initSVG(computedColor, bgImage);
    return;
  }

  if (!("contextMenu" in gDocElm && "HTMLMenuItemElement" in window)) {
    alert("This userscript requires Firefox 15 or newer.");
    return;
  }

  setBgColor(bgColor); // Set background color from pref
  setBgImage(bgImage); // Set background patters from pref
  showTransparency(imgTrans); // Set image transparency from pref
  saveComputedColor();
  GM_addStyle(GM_getResourceText("css")); // Inject style from @resource

  // Append elements
  var div = document.body.appendChild(document.createElement("div"));
  div.innerHTML = GM_getResourceText("htmlElements");

  // Check if JavaScript is enabled for JSColor to work
  if (getComputedStyle($("noscript"), null).display == "none") { // If JavaScript is enabled
    jscolor.dir = "https://raw.github.com/LouCypher/userscripts/master/image-background/jscolor/";
    $("color-picker").value = bgColor;
  } else { // JavaScript is disabled
    jscolor.binding = false; // Disable color picker
    $("error").className = "";
    var p = $("color-config").querySelector("div");
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
  $("donate").addEventListener("click", showThanks, false);
  $("help").addEventListener("click", goHelp, false);

  // Set context menu to html element
  gDocElm.setAttribute("contextmenu", "context-menu");
  gDocElm.addEventListener("contextmenu", popupShowing, false);
  /***** End context menu initialization *****/

  // Color dialog initialization
  gDocElm.addEventListener("click", hidePicker, false);
  $("color-picker").addEventListener("mouseenter", showPicker, false);
  $("color-picker").addEventListener("input", previewBgColor, false);
  $("color-picker").addEventListener("change", previewBgColor, false);
  $("color-config").addEventListener("keypress", function(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    switch (e.keyCode) {
      case 13: // 'Enter' key is pressed
        saveBgColor();
        break;
      case 27: // 'Escape' key is pressed
        $("color-picker").value = GM_getValue("bgColor", "");
        resetBgColor();
      default: return;
    }
  }, false);
  $("ok").addEventListener("click", saveBgColor, false);
  $("cancel").addEventListener("click", resetBgColor, false);
  $("default").addEventListener("click", defaultBgColor, false);
  $("error").addEventListener("click", showAlert, false);
}

// Show 'thank you' page
function showThanks() {
  var thanks = GM_getResourceURL("thanks");
  if (/^data\:/.test(thanks)) { // If old GM_resourceURL
    thanks = thanks.replace(/text\/plain/, "text/html");
  }
  GM_openInTab(thanks); // Open 'thank you' page
}

// Executed on right click
function popupShowing(aEvent) {
  var node = aEvent.target; // The web element you right click on
  while (node && node.id != "color-config") node = node.parentNode;
  if (node) { // Color config dialog
    gDocElm.removeAttribute("contextmenu"); // Hide context menu items
  } else {
    gDocElm.setAttribute("contextmenu", "context-menu"); // Show context menu items
  }
}

// Check validity of color value
function validateColor(aColor, aCallback) {
  // Set dummy element color
  $("dummy").style.color = (aColor == "") ? "#222" : aColor;
  var save = false;
  var computedColor = getComputedStyle($("dummy"), null).color;

  if (computedColor == "transparent") {
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
    gDocElm.style.backgroundColor = ""; // Use default color from CSS resource
  } else {
    setStyleProperty(gDocElm, "background-color", aColorValue);
  }
}

// Save color setting to preferences
function saveBgColor() {
  var color = $("color-picker").value;
  if (validateColor(color, setBgColor)) { // If color value is valid
    GM_setValue("bgColor", color); // Save color value to pref
    saveComputedColor();
    hideColorConfig();
  }
}

// Reset background color to previous setting
function resetBgColor() {
  setStyleProperty(gDocElm, "background-color", GM_getValue("bgColor", ""));
  hideColorConfig();
}

// Use default background color
function defaultBgColor() {
  $("color-picker").value = "";
  gDocElm.style.backgroundColor = "";
}

// Show color configuration dialog
function showColorConfig() {
  $("change-background-color").disabled = true; // Disable menu item
  $("color-config").className = "";
  $("color-picker").value = GM_getValue("bgColor", "");
  $("color-picker").focus();
}

// Hide color configuration dialog
function hideColorConfig() {
  ("color" in $("color-picker")) && $("color-picker").color.hidePicker();
  $("color-config").className = "hide"; // Hide dialog
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

function showAlert() {
  var site = (location.protocol == "file:") ? "file://" : location.hostname;
  alert("Color picker requires JavaScript to be enabled. However,\n" +
        "you can still change the background color by entering any\n" +
        "valid color value.\n\nIf you have NoScript extension, color " +
        "picker will work if\nyou click 'Allow " + site +
        "' from NoScript menu.");
}

// Enable/disable background patterns
function setBgImage(aBoolean) {
  switch(aBoolean) {
    case true: // Enable background patterns
      gDocElm.style.backgroundImage = ""; // Use bg patterns in CSS resource
      break;
    case false: // Disable background patterns
      setStyleProperty(gDocElm, "background-image", "none");
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

function goHelp() {
  GM_openInTab("https://github.com/LouCypher/userscripts/blob/master/image-background/readme.md#change-background-color");
}

function setStyleProperty(aNode, aPropertyName, aValue) {
  aNode.style.setProperty(aPropertyName, aValue, "important");
}

function saveComputedColor() {
  GM_setValue("computedColor", getComputedStyle(gDocElm, null).backgroundColor);
}

function initSVG(aColorValue, aBgImage) {
  if ((getComputedStyle(gDocElm, null).backgroundColor != "transparent") ||
      (getComputedStyle(gDocElm, null).backgroundImage != "none"))
    return; // Don't override if SVG has background color or background image

  // Append <style> element (because GM_addStyle doesn't work on SVG)
  var style = document.createElementNS("http://www.w3.org/2000/svg", "style");
  style.type = "text/css";
  style.textContent = 'svg { background: #222 url("data:image/png;base64,'
                    + 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hA'
                    + 'AAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAC'
                    + '5JREFUOMtjZGBgsGfAA/7//38QnzwTA4Vg1IDBYADj///'
                    + '/8StgZLQfDcRhbwAAfyQHW028hvoAAAAASUVORK5CYII=")'
                    + ' 0 0 repeat fixed !important;'
                    + ' margin: auto !important; position: absolute;'
                    + ' top: 0; right: 0; bottom: 0; left: 0; }';
  gDocElm.appendChild(style);

  setBgColor(aColorValue); // Set background color from pref
  setBgImage(aBgImage); // Set background patters from pref
}

function $(aId) {
  return document.getElementById(aId);
}
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
// @version         3.1
// @author          LouCypher
// @license         GPL
// @homepageURL     https://github.com/LouCypher/userscripts
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/image-background.user.js
// @resource        css https://raw.github.com/LouCypher/userscripts/master/others/image-background.css
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @run-at          document-start
// @include         *
// @grant           GM_addStyle
// @grant           GM_getResourceText
// @grant           GM_getValue
// @grant           GM_setValue
// ==/UserScript==

/*
  Changelog:
  3.1 - Scriptish compatibility.
  3.0 - Background color and patterns are now configurable.
  2.2 - Changed name and description.
  2.1 - Customizable color for background checkers in CSS.
  2.0 - Using @resource for CSS.
  1.0 - Initial release.
*/

if (!/^image\//.test(document.contentType)) return;

var colorPref = "bgColor"; // Color pref name
var bgColor = GM_getValue(colorPref, ""); // Retrieve color value from pref
var bgImage = GM_getValue("bgImage", true);

var html = document.documentElement;
setBgColor(bgColor); // Set background color
setBgImage(bgImage);

GM_addStyle(GM_getResourceText("css")); // Inject style from @resource

if (!("contextMenu" in html && "HTMLMenuItemElement" in window)) return;

// Add context menu
var id = (typeof GM_info == "object")
          ? GM_info.script.name
          : "Standalone Image Background and Transparency";
id = id.replace(/\s/g, "-") + "-";
var menu = document.body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="' + id + 'context-menu"\
                        type="context">\
                    <menuitem id="' + id + 'change-background-color"\
                              label="Change backgound color"></menuitem>\
                    <menuitem id="' + id + 'toggle-background-image"\
                              type="checkbox"\
                              label="Use background patterns"></menuitem>\
                  </menu>';

// Init context menu
if (bgImage) $("#" + id + "toggle-background-image").setAttribute("checked", "true");
$("#" + id + "change-background-color").addEventListener("click", configColor, false);
$("#" + id + "toggle-background-image").addEventListener("click", toggleBgImage, false);
html.setAttribute("contextmenu", id + "context-menu");

/**/

function setBgColor(aColorValue) {
  if (aColorValue == "") {
    html.style.backgroundColor = ""; // Use default color in CSS resource
  } else {
    html.style.setProperty("background-color", aColorValue, "important");
  }
  GM_setValue("bgColor", aColorValue); // Store color value to pref
}

function setBgImage(aBoolean) {
  switch(aBoolean) {
    case true: html.style.backgroundImage = ""; // Use bg patterns in CSS resource
               break;
    case false: html.style.setProperty("background-image", "none", "important");
  }
  GM_setValue("bgImage", aBoolean);
}

function toggleBgImage(aEvent) {
  setBgImage(aEvent.target.checked);
}

function configColor() {
  var color = prompt("Enter valid color value.\n" +
                     "Enter empty string to use default color.\n\n",
                     GM_getValue(colorPref, ""));
  if (color || (color == "")) setBgColor(color);
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}
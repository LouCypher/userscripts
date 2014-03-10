/*  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// ==UserScript==
// @id              addons-manager-stylish-install-style-from-url
// @name            Add-ons Manager - Stylish - Install style from URL
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add menu item to install style from URL. Requires Stylish 1.4 or newer.
// @version         1.0
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://addons.cdn.mozilla.net/media/img/addon-icons/default-32.png
// @icon64URL       https://addons.cdn.mozilla.net/media/img/addon-icons/default-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Add-ons+Manager+-+Stylish+-+Install+style+from+URL
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/scriptish/addons-manager-stylish-install-style-from-url
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-stylish-install-style-from-url/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-stylish-install-style-from-url/userscript.user.js
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-stylish-install-style-from-url/screenshot.png
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-stylish-install-style-from-url/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @run-at          document-end
// @include         about:addons
// @include         chrome://mozapps/content/extensions/extensions.xul
// ==/UserScript==

function $(aId) document.getElementById(aId);

var stylishMenu = document.createElement("menuitem");
stylishMenu.id = "stylish-menuitem-installFromURL";
stylishMenu.setAttribute("label", "Install User Style from URL\u2026");
stylishMenu.setAttribute("oncommand", "stylishCommon.startInstallFromUrls();");

// If Stylish is not installed or Stylish version is earlier than 1.4
if (!("stylishCommon" in window && "startInstallFromUrls" in stylishCommon))
  stylishMenu.setAttribute("disabled", "true"); // Disable menuitem

$("utils-menu").insertBefore(stylishMenu, $("scriptish-installFromFile").nextSibling);

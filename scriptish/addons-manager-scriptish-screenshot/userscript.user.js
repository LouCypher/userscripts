/*  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// ==UserScript==
// @id              addons-manager-scriptish-screenshot@loucypher
// @name            Add-ons Manager - Scriptish Screenshot
// @namespace       https://github.com/LouCypher/userscripts
// @description     Show screenshot on Scriptish user script page in Add-ons Manager.
// @version         1.0
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://addons.cdn.mozilla.net/media/img/addon-icons/default-32.png
// @icon64URL       https://addons.cdn.mozilla.net/media/img/addon-icons/default-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Add-ons+Manager+-+Scriptish+Screenshot
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/scriptish/addons-manager-scriptish-screenshot
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-scriptish-screenshot/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-scriptish-screenshot/userscript.user.js
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-scriptish-screenshot/screenshot.png
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/scriptish/addons-manager-scriptish-screenshot/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @run-at          document-start
// @include         about:addons
// @include         chrome://mozapps/content/extensions/extensions.xul
// ==/UserScript==

function getXPCOMInterface(aClass, aInterface) {
  return Components.classes["@mozilla.org/" + aClass].
         getService(Components.interfaces[aInterface]);
}

const iOService = getXPCOMInterface("network/io-service;1", "nsIIOService");
const styleSheetService = getXPCOMInterface("content/style-sheet-service;1",
                                            "nsIStyleSheetService");

let css = "/* Add-ons Manager Scriptish Screenshot\n\
   by LouCypher */\n\n\
@namespace url(http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
\n@-moz-document url(about:addons),\
\n               url(chrome://mozapps/content/extensions/extensions.xul){\
\n  #detail-view[type=userscript] #detail-screenshot[width=null][height=null]{\
\n    min-width: 200px;\n    min-height: 150px;\n  }\n}\n";

let uri = iOService.newURI("data:text/css," + encodeURIComponent(css), null, null);
styleSheetService.loadAndRegisterSheet(uri, styleSheetService.AGENT_SHEET);

window.addEventListener("unload", function() {
  styleSheetService.unregisterSheet(uri, styleSheetService.AGENT_SHEET);
});

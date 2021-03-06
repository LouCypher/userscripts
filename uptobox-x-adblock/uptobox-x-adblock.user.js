/*
    Bypass anti-adblock on uptobox.com.
    Copyright (C) 2013 LouCypher

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
// @id              uptobox-x-adblock@loucypher
// @name            Uptobox x Adblock
// @namespace       http://kask.us/gVMKK
// @description     Bypass anti-adblock on uptobox.com.
// @version         2.3
// @author          LouCypher
// @contributor     coolkips
// @license         GPL
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Uptobox+x+Adblock
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/uptobox-x-adblock
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/uptobox-x-adblock.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/uptobox-x-adblock.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/uptobox-x-adblock/CHANGELOG.txt
// @run-at          document-start
// @include         http://uptobox.com/*
// @include         http://www.uptobox.com/*
// @grant           none
// ==/UserScript==

if ("onbeforescriptexecute" in window) {
  // Block script before it's executed. Gecko browsers only.
  window.addEventListener("beforescriptexecute", function(aEvent) {
    if (/\/pages\/adblock.html/.test(aEvent.target.textContent)) {
      window.removeEventListener(aEvent.type, arguments.callee, true);
      aEvent.preventDefault();
    }
  }, true)
}

if (location.pathname == "/pages/adblock.html" && document.referrer) {
  if ((typeof opera === "object" && typeof GM_log !== "function") || 
      (typeof safari === "object")) {
    // If Opera UserJS and not Violentmonkey or if Safari (NinjaKit)
    addForm();
  } else {
    // Chrome userscript or Tampermonkey (Chrome) or Violentmonkey (Opera)
    document.addEventListener("DOMContentLoaded", addForm, false);
  }
}

function addForm() {
  var lang = getLanguage();
  var title = lang == "english" ? "Download" : "T\u00E9l\u00E9charger";
  history.replaceState(history.state, title, document.referrer);
  var form = document.createElement("form");
  form.method = "post";
  form.appendChild(addInput("op", "download1"));
  form.appendChild(addInput("id", location.pathname.match(/\w+/)));
  form.appendChild(addInput("method_premium", setButtonLabel("premium", lang), "submit"));
  form.appendChild(addInput("method_free", setButtonLabel("free", lang), "submit"));
  $("#container-page .middle-content").innerHTML = form.outerHTML;
  $("#container-page .page-top").textContent = title;
}

function addInput(aName, aValue, aType) {
  var input = document.createElement("input");
  input.name = aName;
  input.type = aType ? aType : "hidden";
  // Opera doesn't recognize input.value, use setAttribute instead
  input.setAttribute("value", aValue ? aValue : "");
  return input;
}

function getLanguage() {
  var lang = "english";
  document.cookie.split(";").forEach(function(cookie) {
    if (/lang/.test(cookie)) lang = cookie.match(/\w+$/).toString();
  })
  return lang;
}

function setButtonLabel(aMethod, aLanguage) {
  var premium = {
    en: "Premium Download",
    fr: "T\u00E9l\u00E9chargement premium"
  }
  var free = {
    en: "Free Download",
    fr: "T\u00E9l\u00E9chargement gratuit"
  }
  if (aLanguage == "french") {
    return aMethod == "premium" ? premium.fr : free.fr;
  } else {
    return aMethod == "premium" ? premium.en : free.en;
  }
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}
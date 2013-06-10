/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 *  Contributor(s):
 *  - LouCypher (original code)
 */

// ==UserScript==
// @id              about-newtab@loucypher
// @name            about:newtab
// @namespace       http://mozilla.status.net/loucypher
// @description     Add input fields to change rows and columns setting on about:newtab page.
// @version         3.0a1
// @author          LouCypher
// @contributor     Benjamin Humphrey - icons http://findicons.com/icon/554396/64_thumbnails
// @license         MPL 2.0
// @icon            https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/icon32.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/icon64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?about%3Anewtab
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/scriptish/about-new-tab
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/about-new-tab.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/about-new-tab.user.js
// @resource        favicon https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/favicon.ico
// @resource        CSS  https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/about-new-tab.css
// @resource        HTML https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/about-new-tab.html
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @include         about:newtab
// @include         chrome://browser/content/newtab/newTab.xul
// @run-at          document-end
// ==/UserScript==

(function() {
  // Set favicon. Couldn't be done using DOM method, so I cheated with nsIStyleSheetService.
  let css = '\
    @namespace url("' + document.documentElement.namespaceURI + '");\
    tab[label="' + document.title + '"] .tab-icon-image {\
      list-style-image: url(' + GM_getResourceURL("favicon") + ') !important;\
    }'
  let sss = Components.classes["@mozilla.org/content/style-sheet-service;1"]
                      .getService(Ci.nsIStyleSheetService);
  let uri = Services.io.newURI("data:text/css,/*about:newtab userscript*/" +
                               encodeURIComponent(css), null, null);
  if (!sss.sheetRegistered(uri, sss.USER_SHEET))
    sss.loadAndRegisterSheet(uri, sss.USER_SHEET);

  /***** Begin initializations *****/

  var style = document.documentElement.appendChild(document.createElementNS(HTML_NAMESPACE, "style"));
  style.type = "text/css";
  style.textContent = GM_getResourceText("CSS");

  var divS = (new DOMParser).parseFromString(GM_getResourceText("HTML"), "application/xml")
                            .documentElement;

  if (typeof newTabTools === "object") { // If New Tab Tools extension is enabled
    gAllPages.enabled = true; // Always show thumbnails

    $("#config-inner").insertBefore(divS, $("#config-morePrefs"));
    $("#config-inner").insertBefore(document.createElement("spacer"), $("#config-morePrefs"));

    let label = $("#config-inner").insertBefore(document.createElement("label"), divS);
    label.className = "header";
    label.value = "Rows and Columns:";

    let spacers = document.querySelectorAll("#config-inner > spacer");
    for (let i = 0; i < spacers.length; i++) {
      spacers[i].style.height = "2em";
    }
    $("#config-title-input") && $("#config-title-input").removeAttribute("flex");
    $("#config-morePrefs").style.color = "inherit";
  }
  else
    $("#newtab-horizontal-margin").insertBefore(divS, $(".newtab-side-margin:last-child"));

  ["#setting-columns", "#setting-rows"].forEach(function(aSelector) {
    $(aSelector).value = getIntPref(aSelector.match(/[a-z]+$/).toString());
    $(aSelector).addEventListener("change", setValueFromInput);
    $(aSelector).addEventListener("DOMMouseScroll", mouseWheel); // Change value with mouse scroll
  })

  $('#newtab-form input[type="reset"]').addEventListener("click", function() {
    setIntPref("columns", $("#setting-columns").value = 3);
    $("#setting-columns").classList.add("default-value");
    setIntPref("rows", $("#setting-rows").value = 3);
    $("#setting-rows").classList.add("default-value");
  })

  $('#newtab-form input[type="button"]').addEventListener("click", function() {
    gAllPages.enabled = !gAllPages.enabled;
  })


  function setIntPref(aRowsOrColumns, aInt) {
    Services.prefs.setIntPref("browser.newtabpage." + aRowsOrColumns, aInt);
  }

  function getIntPref(aRowsOrColumns, aInt) {
    return Services.prefs.getIntPref("browser.newtabpage." + aRowsOrColumns);
  }

  // Save input value to preference
  function setValueFromInput(aEvent) {
    let input = aEvent.target;
    let value = input.value;
    if (isNaN(value)) input.value = 3;
    else if (value < 1) input.value = 1;    // min =  1
    else if (value > 50) input.value = 50;  // max = 50

    if (input.value == 3)
      input.classList.add("default-value");
    else
      input.classList.remove("default-value");
    
    setIntPref(input.id.match(/[a-z]+$/).toString(), input.value);
  }

  // Use mouse scroll to increase/decrease value in text input
  // https://developer.mozilla.org/DOM/DOM_event_reference/DOMMouseScroll
  function mouseWheel(aEvent) {
    let input = aEvent.target;
    if (aEvent.detail > 0) {                // Scroll down
      if (input.value > 1) input.value--;   // Decrease number if value > 1
      else aEvent.stopPropagation();        // else stop (min = 1)
    }
    else {                                  // Scroll up
      if (input.value < 50) input.value++;  // Increase number if value < 50
      else aEvent.stopPropagation();        // else stop (max = 50)
    }
    setValueFromInput(aEvent);
  }

  function $(aSelector, aNode) {
    return (aNode || document).querySelector(aSelector);
  }
})()

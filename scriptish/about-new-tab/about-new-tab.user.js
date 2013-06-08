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
// @version         2.0
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
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/scriptish/about-new-tab/about-new-tab.css
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
  let uri = Services.io.newURI("data:text/css," +
                               "/*about:newtab user script*/" +
                               encodeURIComponent(css), null, null);
  if (!sss.sheetRegistered(uri, sss.USER_SHEET))
    sss.loadAndRegisterSheet(uri, sss.USER_SHEET);

  /***** Begin initializations *****/

  var NewTab = {
    get prefs() {
      return Services.prefs.getBranch("browser.newtabpage.");
    },

    get columns() {
      return this.prefs.getIntPref("columns");
      return gGridPrefs.gridColumns;
    },

    get rows() {
      //return this.prefs.getIntPref("rows");
      return gGridPrefs.gridRows;
    },

    setPref: function setPref(aRowsOrColumns, aInt) {
      this.prefs.setIntPref(aRowsOrColumns, aInt);
    },

    createElement: function createElement(aElement) {
      return document.createElementNS(HTML_NAMESPACE, aElement);
    }
  }

  var style = document.documentElement.appendChild(NewTab.createElement("style"));
  style.type = "text/css";
  style.textContent = GM_getResourceText("CSS");

  var divS = NewTab.createElement("div");
  divS.id = "newtab-settings";

  if (typeof newTabTools === "object") { // If New Tab Tools extension is enabled
    gAllPages.enabled = true; // Show thumbnails

    $("#config-inner").insertBefore(divS, $("#config-morePrefs"));
    $("#config-inner").insertBefore(document.createElement("spacer"), $("#config-morePrefs"));

    let label = divS.appendChild(document.createElement("label"));
    label.className = "header";
    label.value = "Rows and Columns:";

    let spacers = document.querySelectorAll("#config-inner > spacer");
    for (let i = 0; i < spacers.length; i++) {
      spacers[i].style.height = "2em";
    }
    $("#config-title-input").removeAttribute("flex");
    $("#config-morePrefs").style.color = "inherit";
  }

  else
    $("#newtab-horizontal-margin").insertBefore(divS, $(".newtab-side-margin:last-child"));

  var divF = divS.appendChild(NewTab.createElement("div"));
  divF.id = "newtab-form";

  divF.appendChild(addInputField("Number of columns", "setting-columns", NewTab.columns));
  divF.appendChild(addInputField("Number of rows", "setting-rows", NewTab.rows));

  // Reset button to reset thumbnails row and columns settings to default (3x3)
  var rButton = divF.appendChild(NewTab.createElement("input"));
  rButton.type = "reset";
  rButton.value = "Reset to default";
  rButton.addEventListener("click", function() {
    NewTab.setPref("columns", $("#setting-columns").value = 3);
    $("#setting-columns").classList.add("default-value");
    NewTab.setPref("rows", $("#setting-rows").value = 3);
    $("#setting-rows").classList.add("default-value");
  })

  // Thumbnails button to toggle thumbnail view
  var tButton = divF.appendChild(NewTab.createElement("input"));
  tButton.type = "button";
  tButton.title = newTabString("show");
  tButton.addEventListener("click", function() {
    gAllPages.enabled = !gAllPages.enabled;
  })

  function addInputField(aLabel, aId, aValue) {
    let div = NewTab.createElement("div");

    let label = div.appendChild(NewTab.createElement("label"));
    label.textContent = aLabel;
    label.setAttribute("for", aId);

    let input = div.appendChild(NewTab.createElement("input"));
    input.id = aId;
    input.type = "text";
    input.value = aValue;
    input.size = "4";
    if (aValue == 3) input.className = "default-value";

    input.addEventListener("change", setValueFromInput);
  //input.addEventListener("input", setValueFromInput);   // Didn't work well
  //input.addEventListener("keydown", arrowUpDown);       // Conflicted with change event
    input.addEventListener("DOMMouseScroll", mouseWheel); // Change value with mouse scroll

    return div;
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
    
    NewTab.setPref(input.id.match(/[a-z]+$/).toString(), input.value);
  }

  // Use mouse scroll to increase/decrease value in text input
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

  // Use up/down key to increase/decrease value in text input
  function arrowUpDown(aEvent) {
    let input = aEvent.target;
    switch (aEvent.keyCode) {
      case 38:  // Up arrow
        if (input.value < 50) input.value++;  // Increase number if value < 50
        else aEvent.stopPropagation();        // else stop (max = 50)
        break;
      case 40:  // Down arrow
        if (input.value > 1) input.value--;   // Decrease number if value > 1
        else aEvent.stopPropagation();        // else stop (min = 1)
        break;
      default: aEvent.stopPropagation();
    }
    console.log(input.value);
    setValueFromInput(aEvent);
  }

  function $(aSelector, aNode) {
    return (aNode || document).querySelector(aSelector);
  }
})()

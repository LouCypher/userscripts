/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// ==UserScript==
// @name            mozillaZine Forums Menu
// @namespace       http://mozilla.status.net/loucypher
// @description     Navigation menu for mozillaZine Forums
// @version         2.11
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/icon.png
// @resource        CSS https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/mzf-menu.css
// @resource        JSON https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/mzf-menu.json
// @resource        license https://raw.github.com/LouCypher/userscripts/master/mozillazine-forums-menu/LICENSE.txt
// @updateURL       https://userscripts.org/scripts/source/1455.meta.js
// @include         http://forums.mozillazine.org/*
// ==/UserScript==

/*
    Changelog:
      * v2.11 (2012-07-24): Using innerHTML instead of deprecated E4X.
      * v2.10 (2012-07-04): Refactored.
      * v2.9 (2012-06-25):
        * Shifted menubar top position.
        + Menubar transition.
      * v2.8 (2012-06-25): Refactored.
      * v2.7 (2012-06-25): Resize menubar when window is resized.
      * v2.6 (2012-06-24): Fixed position when scroll.
      * v2.5 (2012-06-22):
        + Use @resource metadata for CSS
        + Use @resource metadata for menu data as JSON
        + Added @updateURL metadata
        * Upgraded license to MPL 2.0
      * v2.2 (2011-07-21):
        + Added links to official forums for Firefox/Thunderbird/mobile
        * Cosmetic changes
      * v2.1 (2011-07-19):
        + Added link to this user script at userscripts.org
        x Cosmetic changes
      * v2.0 (2011-07-18): Updated
      * 2006-07-31: Updated to new layout
      * 2006-06-20: Added new forum and new forum category
      * 2006-06-12: Rearranged
      * 2005-08-13: Rearranged
      * 2005-08-08:
        - Fixed menu positions
        - Added index to insertMenu function
        - Added User Links menu
*/

var pageHeader = $("#page-header");
var pageBody = $("#page-body");
var linklist = $(".linklist", pageHeader);
if (!linklist) return;

resizeMenubar();
repositionMenubar();

const htmlns = "http://www.w3.org/1999/xhtml";

GM_addStyle(GM_getResourceText("CSS"));

var forums = JSON.parse(GM_getResourceText("JSON"));

for (var i = 0; i < forums.length; i++) {
  let sibling = $(".rightside", linklist);
  let menu = addMenu(forums[i].name, forums[i].id, sibling);
  for (var j = 0; j < forums[i].subs.length; j++) {
    let submenu = $(".submenu", menu);
    addSubMenu(forums[i].subs[j].name, forums[i].subs[j].id,
               submenu, forums[i].subs[j].url);
  }
}

addEventListener("resize", resizeMenubar, false);
addEventListener("scroll", repositionMenubar, false);

function addMenu(aText, aId, aSibling) {
  let icon = setIconFromCurrent(".icon-home > strong > strong + a", aId);
  let menu = '<li xmlns="' + htmlns + '" class="icon-'
           + icon + ' menu"><strong><a href="/viewforum.php?f='
           + aId + '">' + aText + '</a></strong><ul class="submenu">'
           + '</ul></li>';
  return aSibling.parentNode.insertBefore(makeXML(menu), aSibling);
}

function addSubMenu(aText, aId, aParent, aExternal) {
  let external = (aExternal != null)
  let icon = setIconFromCurrent(".icon-home > strong > a:last-child", aId);
  let menu = '<li xmlns="' + htmlns + '" class="icon-'
           + (icon + (external ? ' external' : ''))
           + '"><strong><a href="'
           + (external ? aExternal : ('/viewforum.php?f=' + aId))
           + '">' + aText + '</a></strong></li>';
  aParent.appendChild(makeXML(menu));
}

function setIconFromCurrent(aSelector, aId) {
  let icon = "";
  switch (aId) {
    case "!": icon = "logout"; break;
    case "?": icon = "faq"; break;
    default:  icon = "bump";
  }
  let current = $(aSelector);
  if (current) {
    if (current.href.match(/\d+/) == aId) {
      icon = "subscribe";
    }
  }
  return icon;
}

function $(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

function makeXML(aXMLString) {
  return (new DOMParser).parseFromString(aXMLString, "application/xml")
                        .documentElement;
}

function resizeMenubar() {
  pageHeader.style.width = getComputedStyle(pageBody, null).
                           getPropertyValue("width");
}

function repositionMenubar() {
  if (pageYOffset >= $("#masthead").offsetHeight) {
    pageHeader.className = "fixed";
  } else {
    pageHeader.className = "";
  }
}
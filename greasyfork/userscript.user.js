/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              my-greasy-fork@loucypher
// @name            My Greasy Fork
// @namespace       https://github.com/LouCypher/userscripts
// @description     For personal use.
// @version         3.0
// @author          LouCypher
// @license         WTFPL
// @homepageURL     https://greasyfork.org/scripts/199
// @supportURL      https://greasyfork.org/scripts/199/feedback
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/greasyfork/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/greasyfork/userscript.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://greasyfork.org/*
// @exclude         https://greasyfork.org/*/code.user.js
// @exclude         https://greasyfork.org/forum/*
// @grant           none
// ==/UserScript==

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function $$(aSelector, aNode) {
  return (aNode || document).querySelectorAll(aSelector);
}

function createElement(aTagName) {
  return document.createElement(aTagName);
}

function createText(aText) {
  return document.createTextNode(aText);
}

function createLink(aURL, aText, aName) {
  var link = createElement("a");
  aURL && (link.href = aURL);
  aText && (link.textContent = aText);
  aName && (link.name = aName);
  return link;
}

function redirectTo(aURL) {
  location.replace(aURL);
}

// User's profile page
var isUserPage = /\/users\/\d+$/.test(location.href);

// Script listing page
var isScriptsListing = location.pathname === "/scripts" ||
                       location.pathname === "/scripts/";

// New script page
var isNewScriptPage = location.pathname === "/script_versions/new";

// Update script page
var isUpdateScriptPage = /\/scripts\/\d+\/versions\/new/.test(location.pathname);

if ($(".scripts-index-link a"))
  $(".scripts-index-link a").href += "?sort=updated";

if (isScriptsListing && !location.search)
  redirectTo(location.href += "?sort=updated");

if (isScriptsListing && /\?page\=\d+$/.test(location.search))
  redirectTo(location.href += "&sort=daily");

if (isScriptsListing && !/sort\=daily/.test(location.search))
  $('.script-list-option a[href="/scripts"]').href += "?sort=daily";

if (isNewScriptPage) {
  $("#script_script_type_id_2").checked = true;
  $("#script_version_additional_info_markup_markdown").checked = true;
}

if (isNewScriptPage || isUpdateScriptPage) {
  $("#preview-script-additional-info-results").style.paddingTop = "30px";
  $("#preview-script-additional-info").addEventListener("click", function(e) {
    $("#preview-script-additional-info-results").scrollIntoView();
  });
}

/*  Add "discussions on user's scripts" link  */
/*  This will be merged to 'Script Counter' user script
if (isUserPage) {
  var userID = location.pathname.match(/\d+/).toString();
  var userName = $("h2").textContent;
  var userForumURL = "/forum/?Discussion/ScriptAuthorID=" + userID;

  var userForum = $("#user-discussions-on-scripts-written ul");
  if (userForum) {
    userForum.appendChild(createElement("li"))
             .appendChild(createLink(userForumURL, "More discussions\u2026"));
  }

  else {
    var scriptList = $("#user-script-list") || $("#table-container");
    if (scriptList) {
      $("header", scriptList.parentNode).appendChild(createElement("p")).
      appendChild(createLink(userForumURL, "Discussions on " + userName + "'s scripts"));
    }
  }
}
*/

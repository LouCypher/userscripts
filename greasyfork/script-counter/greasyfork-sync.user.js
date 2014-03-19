/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              greasy-fork-script-counter@loucypher
// @name            Greasy Fork - Script Counter
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add number of scripts on user's profile page
// @version         3.0
// @author          LouCypher
// @license         WTFPL
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/greasyfork/script-counter/screenshot.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Greasy+Fork+-+Script+Counter
// @homepageURL     https://greasyfork.org/scripts/180
// @supportURL      https://greasyfork.org/scripts/180/feedback
// @updateURL       https://greasyfork.org/scripts/180/code.user.js
// @downloadURL     https://greasyfork.org/scripts/180/code.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/greasyfork/script-counter/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @run-at          document-end
// @include         https://greasyfork.org/users/*
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

function showError() {
  var pAlert = $("p.alert");
  if (pAlert) {  // Display error notification
    pAlert.classList.add("important");
    pAlert.innerHTML = '<a href="/scripts/180">Script Counter</a>'
                     + ' user script detects an error.'
                     + ' Please <a href="/forum/post/discussion?'
                     + 'Discussion/ScriptID=180">notify</a>'
                     + ' the author.';
  }
  else  // Log in console
    console.log("Some thing went wrong.");
}

var scripts;

var scriptEntries = $$("#user-script-list > li");
if (scriptEntries.length)
  scripts = scriptEntries.length;  // User has script(s)

if (scripts) {  // If user has script(s)
  var userID = location.pathname.match(/\d+/).toString();
  var userName = $("h2").textContent;
  var userForumURL = "/forum/?Discussion/ScriptAuthorID=" + userID;

  // Add number of script(s) in Scripts section
  var title = $("body > section:not([id]) h3");
  if (title)
    title.appendChild(createText(" (" + scripts + ")"));
  else
    showError(); // Sam ting wen wong

  // Add "discussions on user's scripts" link
  var userForum = $("#user-discussions-on-scripts-written ul");
  if (userForum) {
    userForum.appendChild(createElement("li"))
             .appendChild(createLink(userForumURL, "More discussions\u2026"));
  }
  else {
    var scriptList = $("#user-script-list") || $("#table-container");
    if (scriptList) {
      $("header", scriptList.parentNode).appendChild(createElement("p")).
      appendChild(createLink(userForumURL, "Discussions on " + userName +
                                           "'s scripts"));
    }
  }
} // else user doesn't have any scripts or the scripts are unlisted/deleted

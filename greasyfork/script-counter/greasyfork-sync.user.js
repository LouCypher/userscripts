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
// @version         3.1
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
// @grant           GM_addStyle
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

// Opera UserJS doesn't recognize GM_addStyle so we re-write the function
if (typeof GM_addStyle !== "function") {
  function GM_addStyle(aCSS) {
    var style = createElement("style");
    style.type = "text/css";
    style.textContent = aCSS;
    $("head").appendChild(style);
  }
}

GM_addStyle(".discussion-more{list-style-image:url(data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A\
/wD/oL2nkwAAAsFJREFUOMulk0FoXFUUhr9377lvplPHkjSTNEXohFYwhibgRjsqrS0mG2EQXdil\
6xTc6KY4XUwg6FYCbkQRREFwEYqFGFpN1VQQkZimUVEyXbXJmybqZPJm3rv3XTeT2o1uPMvDOf85\
/Pxf4L3nwZq5dHESmAIqwGivvQ4sAwu1+uwXD84H+wIzly6WgQtDR46eHxsfHywfG5GBUgmAZhTR\
uL1h135a2dq8e+cTYK5Wn23cF+gtz5w+N1l96lSlqLuG3R8cO58laJXR91JI4QmDDVO+u/Fta+nq\
4jxQq9VnG9L75MLpc5PVZytnipsfpTTf28Uoh9EOrTL+WGvzp/IcevUgz7x8pghUl64ubgKva50l\
k0NHht98ofriwL2PM+69H5MXR04sRltEO5AOXrp0bu4ShFB+/kTut19/KV+5PH9TAVNj4xODKjFs\
f9AhJ5ZQpxixBNLBmRbOtMlMjDcpf326haSasfGJQWBKgEr52IjEPzpELDnlEG1x2R7pdgvXsrAt\
KA6gCNF9Qvf7hPLxEQEqAowOlEo03+lixKEyS3xrh260DanCcAjlH8KicSh8M8DNtBn+vAQwum8i\
SmcEmwnxzzukdgcIML4fz0FiBIuQeoUnQGPu50AB680oovicwa3GOBvjsQgPk1GggyH2IXs+R0ye\
PfL0TxeIoghgXQHLjcaGPfBkSEaXjA6KPNoXsRgSb+gQEhPS9jn2fJ6+s0KjsWGBZQUsrK2ubLmC\
pb9+GI9FkcOhSdGkCCmGjg9JjHD8LUVWSLi1urIFLOhrS1//fuXy/FEt5uRjr4zlVKjpfuVw5HvX\
DV0fkogw+jaceC1g+cb11trqyoe1+uy7+ybOXb+2OARUT73xdLF/+hHaX3a5M5cgCI9OC4fPBvhC\
wjf/RHnuX2AaPv/4yYnBcnlESj2Yoiji9n/B9H9w/hupo0mgKfUuDwAAAABJRU5ErkJggg==)};");
// YAY! PINK!

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
    var list = userForum.appendChild(createElement("li"));
    list.className = "discussion-more";
    list.appendChild(createLink(userForumURL, "More discussions\u2026"));
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

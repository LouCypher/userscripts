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
// @version         2.1
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

function showError() {
  var pAlert = document.querySelector("p.alert");
  if (pAlert) {  // Display error notification
    pAlert.classList.add("important");
    pAlert.innerHTML = '<a href="/scripts/180">Script Counter</a>'
                     + ' user script detects an error.'
                     + ' Please <a href="/forum/post/discussion?'
                     + 'Discussion/ScriptID=180">notify</a>'
                     + ' the author.';
  }
  else  // Show error in console
    throw new Error("Some thing went wrong.");
}

var scripts;

var scriptList = document.querySelectorAll("#user-script-list > li");
if (scriptList.length)
  scripts = scriptList.length;  // User has script(s)

if (scripts) {  // If user has script(s)
  var username = document.querySelector("h2");
  var title = document.querySelector("body > section:not([id]) h3");
  if (title)  // add number of script(s) in Scripts section
    title.appendChild(document.createTextNode(" (" + scripts + ")"));
  else
    showError(); // Sam ting wen wong
}
// else user didn't post any scripts

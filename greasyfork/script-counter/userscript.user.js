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
// @version         2.0
// @author          LouCypher
// @license         WTFPL
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/greasyfork/script-counter/screenshot.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Greasy+Fork+-+Script+Counter
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/greasyfork/script-counter
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/greasyfork/script-counter/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/greasyfork/script-counter/userscript.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/greasyfork/script-counter/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @run-at          document-end
// @include         https://greasyfork.org/users/*
// @grant           none
// ==/UserScript==

function throwError() {
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
    throwError(); // Sam ting wen wong
}
// else user didn't post any scripts

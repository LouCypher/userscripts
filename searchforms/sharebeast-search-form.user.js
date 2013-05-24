/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              sharebeast-search-form@loucypher
// @name            Sharebeast - search form
// @namespace       http://userscripts.org/users/12
// @description     Add Google search form on sharebeast.com
// @version         1.1
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Sharebeast+-+search+form
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/searchforms
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/searchforms/sharebeast-search-form.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/searchforms/sharebeast-search-form.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://sharebeast.com/*
// @include         http://www.sharebeast.com/*
// @run-at          document-start
// @grant           GM_addStyle
// ==/UserScript==

if (document.head) {
  var link = document.head.appendChild(document.createElement("link"));
  link.outerHTML = '<link rel="search" type="application/opensearchdescription'
                 + '+xml" title="Sharebeast" href="https://raw.github.com/'
                 + 'LouCypher/userscripts/master/searchforms/searchplugins/'
                 + 'sharebeast-via-google.xml"/>';
}

if ((typeof opera === "object" && typeof GM_log !== "function") || 
    (typeof safari === "object")) {
  // If Opera UserJS and not Violentmonkey or if Safari (NinjaKit)
  addSearchForm();
} else {
  // Chrome userscript or Tampermonkey (Chrome) or Violentmonkey (Opera)
  document.addEventListener("DOMContentLoaded", addSearchForm, false);
}

function addSearchForm() {
  var menu = document.getElementById("menu");
  if (menu) {
    if (typeof GM_addStyle !== "function") {
      function GM_addStyle(aCSS) {
        var node = document.head.appendChild(document.createElement("style"));
        node.type = "text/css";
        node.textContent = aCSS;
      }
    }
    GM_addStyle('#menu form{float:right}' +
                '#menu form input{padding:0 .5em}' +
                '#menu form input[name="q"]{' +
                'height:30px;border:1px solid #ccc}' +
                '#menu form input[type="submit"]{' +
                'height:32px;text-align:center;color:#fff;font-weight:bold;' +
                'text-shadow:0 1px 0 rgba(0, 32, 0, .8);' +
                'background-image:linear-gradient(to bottom,#57d100 25%,' +
                '#008700);border:none}' +
                '#menu form input[type="submit"]:hover{' +
                'background-image:linear-gradient(to bottom,#57d100 50%,' +
                '#008700)}');
    var form = menu.appendChild(document.createElement("form"));
    form.outerHTML = '<form action="//www.google.com/search" method="get">'
                   + '<input type="hidden" name="sitesearch"'
                   + ' value="www.sharebeast.com"/>'
                   + '<input type="text" name="q" size="25" accesskey="s"'
                   + ' tabindex="1" placeholder="Search for downloads"/>'
                   + '<input type="submit" value="Search"/>'
                   + '</form>';
  }
}

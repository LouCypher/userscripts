/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              uptobox-search-form@loucypher
// @name            Uptobox - search form
// @namespace       http://userscripts.org/users/12
// @description     Add Google search form on uptobox.com
// @version         2.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Uptobox+-+search+form
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/searchforms
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/searchforms/uptobox-search-form.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/searchforms/uptobox-search-form.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://uptobox.com/*
// @include         http://www.uptobox.com/*
// @run-at          document-start
// @grant           none
// ==/UserScript==

function addSearchForm() {
  var header = document.getElementById("header");
  if (header) {
    var form = header.appendChild(document.createElement("form"));
    form.outerHTML = '<form action="//www.google.com/search" method="get"'
                   + ' class="search_form"><input type="hidden"'
                   + ' name="sitesearch" value="uptobox.com"/>'
                   + '<input type="search" name="q" size="25" accesskey="s"'
                   + ' tabindex="1" placeholder="Search for downloads"/>'
                   + '<input type="submit" value="Search"/></form>';
  }
}

var head = document.head;
if (head) {
  var css = '.search_form { position: absolute; top: 70px; right: 0;'
          + ' padding: .5em 0 .75em .75em; background-color: #242424; }'
          + ' .search_form input { border: 1px solid transparent; }'
          + ' .search_form input[type="submit"] { background: transparent;'
          + ' color: #fff; }';

  var style = head.appendChild(document.createElement("style"));
  style.outerHTML = '<style type="text/css">' + css + '</style>';

  var link = head.appendChild(document.createElement("link"));
  link.outerHTML = '<link rel="search" type="application/opensearchdescription'
                 + '+xml" title="Uptobox" href="https://raw.github.com/'
                 + 'LouCypher/userscripts/master/searchforms/searchplugins/'
                 + 'uptobox-via-google.xml"/>';
}

if ((typeof opera === "object" && typeof GM_log !== "function") || 
    (typeof safari === "object")) {
  // If Opera UserJS and not Violentmonkey or if Safari (NinjaKit)
  addSearchForm();
} else {
  // Chrome userscript or Tampermonkey (Chrome) or Violentmonkey (Opera)
  document.addEventListener("DOMContentLoaded", addSearchForm, false);
}

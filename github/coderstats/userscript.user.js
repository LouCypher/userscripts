/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            GitHub - CoderStats
// @id              github-coderstats@loucypher
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add link to CoderStats http://coderstats.net//
// @version         1.0
// @author          LouCypher
// @license         WTFPL
// @contributor     Custom Icon Design http://www.iconarchive.com/show/pretty-office-8-icons-by-custom-icon-design.html
// @icon            https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/icon48.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/icon64.png
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/github/coderstats/screenshot.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?GitHub+-+CoderStats
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/github/coderstats
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/github/coderstats/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/github/coderstats/userscript.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/github/coderstats/CHANGELOG.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://github.com/*
// @grant           none
// ==/UserScript==

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function addReportLink() {
  var username = $(".vcard-username");
  var details = $(".vcard-details");
  if (username && details) {
    var list = document.createElement("li");
    list.className = "vcard-detail";
    list.innerHTML = '<span class="octicon octicon-graph coderstats"></span>'
                   + '<a href="http://coderstats.net/github/'
                   + username.textContent + '?ref=userscript">'
                   + 'CoderStats</a>';
    details.appendChild(list);
  }
}

var siteContainer = $("#site-container");
var vcards = $(".vcard-details");

if (siteContainer && vcards) {
  addReportLink();

  if ("MutationObserver" in window || "WebKitMutationObserver" in window) {
    new (MutationObserver ? MutationObserver : WebKitMutationObserver)(function(aMutations) {
      aMutations.forEach(function(aMutation) {
        if (aMutation.removedNodes.length)
          if (!$(".vcard-detail .coderstats"))
            addReportLink();
      });
    }).observe(siteContainer, {childList:true});
  }
}

else
  console.log("GitHub - CoderStats user script: Sam Ting Wen Wong!");

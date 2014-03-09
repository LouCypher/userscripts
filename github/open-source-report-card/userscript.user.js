/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            GitHub - Open Source Report Card
// @namespace       https://userscripts.org/users/12
// @description     Add link to The Open Source Report Card http://osrc.dfm.io/
// @version         2.2
// @author          LouCypher
// @license         WTFPL
// @contributor     Custom Icon Design http://www.iconarchive.com/show/pretty-office-8-icons-by-custom-icon-design.html
// @icon            https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/icon48.png
// @icon64URL       https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/icon64.png
// @screenshot      https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/screenshot.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?GitHub+Open+Source+Report+Card
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/github/open-source-report-card
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/userscript.user.js
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/github/open-source-report-card/CHANGELOG.txt
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
    list.innerHTML = '<span class="octicon octicon-graph osrc"></span>'
                   + '<a href="http://osrc.dfm.io/' + username.textContent
                   + '?ref=userscript">Open Source Report Card</a>';
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
          if (!$(".vcard-detail .osrc"))
            addReportLink();
      });
    }).observe(siteContainer, {childList:true});
  }
}
else
  console.log("GitHub - Open Source Report Card user script: Sam Ting Wen Wong!");

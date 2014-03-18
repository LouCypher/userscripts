// ==UserScript==
// @id              greasy-fork-scripts-links@loucypher
// @name            Greasy Fork - Scripts Links
// @namespace       https://userscripts.org/users/12
// @description     Add more scripts' links on scripts listing.
// @version         3.3
// @author          LouCypher
// @license         MIT License
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Greasy+Fork+-+Scripts+Links
// @homepageURL     https://greasyfork.org/scripts/174
// @supportURL      https://greasyfork.org/scripts/174/feedback
// @updateURL       https://greasyfork.org/scripts/174/code.user.js
// @downloadURL     https://greasyfork.org/scripts/174/code.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/greasyfork/scripts-links/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/greasyfork/scripts-links/CHANGELOG.txt
// @include         https://greasyfork.org/scripts*
// @include         https://greasyfork.org/users/*
// @run-at          document-end
// @grant           GM_addStyle
// @grant           GM_log
// ==/UserScript==

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function $$(aSelector, aNode) {
  return (aNode || document).querySelectorAll(aSelector);
}

function createElement(aNodeName) {
  return document.createElement(aNodeName);
}

function addLink(aURL, aText, aTitle, aPingURL) {
  var link = createElement("a");
  link.className = "script-link";
  link.href = aURL;
  link.textContent = aText;
  if (aTitle)
    link.title = aTitle;
  if (aPingURL)
    link.dataset.pingUrl = aPingURL;
  return link;
}

function addSeparator(aNode, aSpaces) {
  return aNode.appendChild(document.createTextNode(aSpaces ? " | " : "|"));
}

function underReview(aEvent) {
  aEvent.preventDefault();
  var scriptTitle = aEvent.target.dataset.scriptTitle;
  alert(scriptTitle + " is currently under review");
}

// Opera UserJS doesn't recognize GM API so we rewrite the functions
if (typeof GM_addStyle !== "function" && GM_log !== "function") {
  function GM_addStyle(aCSS) {
    var style = createElement("style");
    style.type = "text/css";
    style.textContent = aCSS;
    $("head").appendChild(style);
  }

  function GM_log(aText) {
    console.log(aText);
  }
}

var blocked = /\/(115|116|117|119|120|121|122|123|172)$/;
var user = $(".user-profile-link a"); // Check if you're logged in

/* Get CSRF authenticity token */
var csrfToken = $("head").children["csrf-token"];
var authToken = csrfToken ? "?authenticity_token=" +
                            encodeURIComponent(csrfToken.content)
                          : null;

var scriptBoxes = $$(".script-list article");
//GM_log(scriptBoxes.length);
if (scriptBoxes.length) {
  GM_addStyle(".script-links .script-link{padding:0 .25em}");

  var box, node, name, href, install;
  for (var i = 0; i < scriptBoxes.length; i++) {
    box = scriptBoxes[i];
    name = $("h2 a", box).textContent;  // Script title
    href = $("h2 a", box).getAttribute("href"); // Script page URL
    node = box.insertBefore(createElement("p"), $("footer", box));
    node.className = "script-links";

    install = node.appendChild(addLink(href + "/code.user.js", "install", "",
                                       href + "/install-ping"
                                            + (authToken ? authToken : "")));
    if (blocked.test(href)) {
      install.href = "/scripts/under-assessment";
      install.removeAttribute("data-ping-url");
      install.dataset.scriptTitle = name;
      install.addEventListener("click", underReview);
    }

    addSeparator(node);
    node.appendChild(addLink(href + "/code", "code"));

    addSeparator(node);
    node.appendChild(addLink(href + "/versions", "versions"));

    addSeparator(node);
    node.appendChild(addLink(href + "/feedback", "feedback"));

    // Add 'update' and 'sync' links if you're logged in and it's your own script
    if (user && $(".script-list-author a", box).href === user.href) {
      addSeparator(node);
      node.appendChild(addLink(href + "/versions/new", "update"));
      
      addSeparator(node);
      node.appendChild(addLink(href + "/sync", "sync"));
    }
  }
}

/* Sonny's Greasy Fork user script */
document.addEventListener("DOMContentLoaded", function() {
  var scriptTable = $("#script-table");
  if (scriptTable) {
    GM_addStyle("#script-table tr > td:nth-child(2) a.script-link" +
                "{display:inline}");

    var cells = $$("td:nth-child(2)", scriptTable);
    //GM_log(cells.length);
    if (cells.length) {
      var cell, node, link, name, href, install, userId, authorColumn, mine;
      for (var i = 0; i < cells.length; i++) {
        cell = cells[i];
        name = $("a", cell).textContent;  // Script title
        link = $("a", cell);  // Script page link
        href = link.getAttribute("href"); // Script page URL

        node = cell.appendChild(createElement("span"));
        node.className = "script-links";

        install = node.appendChild(addLink(href + "/code.user.js", "I",
                                           "Install " + link.textContent,
                                           href + "/install-ping"
                                                + (authToken ? authToken : "")));
        if (blocked.test(href)) {
          install.href = "/scripts/under-assessment";
          install.removeAttribute("data-ping-url");
          install.dataset.scriptTitle = name;
          install.addEventListener("click", underReview);
        }

        addSeparator(node);
        node.appendChild(addLink(href + "/code", "C", "Code"));

        addSeparator(node);
        node.appendChild(addLink(href + "/versions", "V", "Version"));

        addSeparator(node);
        node.appendChild(addLink(href + "/feedback", "F", "Feedback"));

        if (user) { // If logged in
          userId = parseInt(user.href.match(/\d+/));

          // Check if it's own your script
          authorColumn = $("td:nth-child(4) a", cell.parentNode);
          if (authorColumn)
            mine = authorColumn.href === user.href;
          else
            mine = parseInt(location.href.match(/\d+/)) === userId;

          // Add 'update' and 'sync' links if you're logged in and it's your own script
          if (mine) {
            addSeparator(node);
            node.appendChild(addLink(href + "/versions/new", "U", "Update"));

            addSeparator(node);
            node.appendChild(addLink(href + "/sync", "S", "Sync"));
          }
        }
      }
    }
  }
});

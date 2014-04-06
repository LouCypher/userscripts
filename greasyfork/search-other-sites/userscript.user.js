// ==UserScript==
// @id              greasyfork-search-other-sites@loucypher
// @name            Greasy Fork - Search other sites
// @namespace       https://github.com/LouCypher/userscripts
// @description     Add search option to search on Userscripts.org and OpenUserJS.org.
// @version         1.1
// @author          LouCypher
// @license         MIT License
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Greasy+Fork+-+Search+other+sites
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/greasyfork/search-other-sites
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/greasyfork/search-other-sites/userscript.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/greasyfork/search-other-sites/userscript.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/greasyfork/search-other-sites/LICENSE.txt
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/greasyfork/search-other-sites/CHANGELOG.txt
// @include         https://greasyfork.org/*
// @grant           none
// ==/UserScript==

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
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

function addStyle(aCSS) {
  var style = createElement("style");
  style.type = "text/css";
  style.textContent = aCSS;
  if (document.head)
    document.head.appendChild(style);
  else
    document.documentElement.appendChild(style);
  return style;
}

var sites = [
  { name: "Userscripts.org", url: "http://userscripts.org/scripts/search?q=" },
  { name: "OpenUserJS",  url: "https://openuserjs.org/search/" }
];

function onsubmit(aEvent) {
  var searchURL;
  var query = aEvent.target.q.value;
  var site = $("#search-other-sites");
  switch (parseInt(site.value)) {
    case 2:  searchURL = sites[1].url; break;
    case 1:  searchURL = sites[0].url; break;
    default: searchURL = null;
  }
  if (searchURL) {
    aEvent.preventDefault();
    location.assign(searchURL + encodeURIComponent(query));
  }
}

function onchange(aEvent) {
  var input = $("#script-search").q;
  switch (parseInt(aEvent.target.value)) {
    case 2:  input.placeholder = "Search " + sites[1].name; break;
    case 1:  input.placeholder = "Search " + sites[0].name; break;
    default: input.placeholder = "Search";
  }
  $("#script-search input[type='submit']").title = input.placeholder;
}

var form = $("#script-search");
if (form) {
  addStyle("#search-other-sites{width:19px;direction:rtl}" +
           "#link-other-sites li{line-height:1.5em}");

  var select = form.insertBefore(createElement("select"), form.lastChild);
  select.id = "search-other-sites";
  select.title = "Search other sites";
  select.innerHTML = '<option value="0">Greasy Fork</option>'
                   + '<option value="1">' + sites[0].name + '</option>'
                   + '<option value="2">' + sites[1].name + '</option>';

  select.addEventListener("change", onchange);
  form.addEventListener("submit", onsubmit);
}

if (location.pathname === "/scripts/search") {
  var xpath = "//p[@id='script-list-sort']/following-sibling::p[text()='No scripts found.']";
  var p = document.evaluate(xpath, document, null, 9, null).singleNodeValue;
  if (p) {
    var query = $("#script-search").q.value;
    p.appendChild(createElement("br"));
    p.appendChild(createText("Search '" + query + "' on other sites:"));
    var ul = document.body.insertBefore(createElement("ul"), p.nextSibling);
    ul.id = "link-other-sites";
    var li;
    sites.forEach(function(site) {
      li = ul.appendChild(createElement("li"));
      li.appendChild(createLink(site.url + encodeURIComponent(query), site.name));
    });
  }
}

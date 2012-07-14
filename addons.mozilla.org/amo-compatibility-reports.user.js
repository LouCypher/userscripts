// ==UserScript==
// @name          View Add-on Compatibility Reports
// @namespace     http://userscripts.org/scripts/show/61398
// @version       0.2
// @description   Adds a link to add-on compatibility reports to addons.mozilla.org.
// @include       https://addons.mozilla.org/*/addon/*
// @include       https://preview.addons.mozilla.org/*/addon/*
// @author        http://userscripts.org/users/fcp
// @license       This program is in the public domain.
// ==/UserScript==

function encodeAsFormValue(s) {
  return s.replace(/[\x00-\x1F!\"#\$%&\'\(\)\*\+,\/\:;<=>\?@\[\\\]\^`\{\|\}]/g, function(str){
    var code = str.charCodeAt(0);
    if (code <= 0x0F)
      return '%0' + code.toString(16).toUpperCase();
    else
      return '%' + code.toString(16).toUpperCase();
  }).replace(/ /g, '+');
}

var found = location.href.match(/^https:\/\/[^\/]+\/([^\/?#]+)\/([^\/?#]+)\/addon\/.*\/?$/);
if (!found) return;
var lang = found[1];
var application = found[2];
var button = document.querySelector(".install-button > a.button");
if (!button) return;
var addonid = button.href.match(/\d+/).toString();

var parent = button.parentNode.parentNode.parentNode.parentNode;
var div = parent.appendChild(document.createElement("div"));
div.style.fontFamily = "'Helvetica Neue', Arial, sans-serif";
div.style.fontSize = "12px";
var a = div.appendChild(document.createElement('a'));
a.href = '/' + lang + '/' + application + '/compatibility/reporter?guid=' + encodeAsFormValue(addonid);
//a.className = "button";
a.appendChild(document.createTextNode('View compatibility reports'));
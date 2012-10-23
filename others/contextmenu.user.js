/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            Context Menu Example
// @namespace       http://userscripts.org/users/12
// @description     Share page/link to Twitter/Facebook/Google+ from browser context menu
// @version         2.0
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/COPYING
// @include         *
// @exclude         file:///*
// @exclude         /^https?://twitter\.com/.*/
// @exclude         /^https?://plus\.google\.com/.*/
// @exclude         /^https?://www\.facebook\.com/.*/
// @grant           none
// ==/UserScript==

/*
  References:
  - https://hacks.mozilla.org/2011/11/html5-context-menus-in-firefox-screencast-and-code/
  - http://thewebrocks.com/demos/context-menu/
*/

var menu = document.body.appendChild(document.createElement("menu"));
menu.outerHTML = '<menu id="userscript-context-menu" type="context">\
                    <menu label="" url="">\
                      <menuitem label="Twitter"\
                                icon="//twitter.com/favicon.ico">\
                      </menuitem>\
                      <menuitem label="Facebook"\
                                icon="//www.facebook.com/favicon.ico">\
                      </menuitem>\
                      <menuitem label="Google+"\
                                icon="//plus.google.com/favicon.ico">\
                      </menuitem>\
                      <!--menuitem label="Test"></menuitem-->\
                    </menu>\
                  </menu>';

var html = document.documentElement;
html.setAttribute("contextmenu", "userscript-context-menu");

// If browser supports contextmenu
if ("contextMenu" in html && "HTMLMenuItemElement" in window) {
  // Executed on clicking a menuitem
  $("#userscript-context-menu menu").addEventListener("click", share, false);
  html.addEventListener("contextmenu", initMenu, false); // Executed on right clicking
}

function initMenu(e) {
  var node = e.target;
  var title = document.title;

  var menu = $("#userscript-context-menu menu");
  menu.label = "Share This Page\u2026"; // Set menu label

  var canonical = $("head link[rel='canonical']");
  // Use canonical where available
  var url = canonical ? canonical.href : location.href;

  // If right click on a link
  while (node && node.nodeName != "A") node = node.parentNode;
  if (node && node.hasAttribute("href")) {
    menu.label = "Share This Link\u2026"; // Menu label when right click on a link
    url = node.href;
    title = e.target.getAttribute("alt") || node.textContent;
  }

  // Set menu title and url attributes
  menu.title = title;
  menu.setAttribute("url", url);
}

function share(e) {
  var title = encodeURIComponent(e.target.parentNode.title);
  var url = encodeURIComponent(e.target.parentNode.getAttribute("url"));
  var name = "userscript-sharer";
  var feature = "width=640, height=480, toolbar=no, location";
  switch (e.target.label) { // context menu label
    case "Twitter": // Share on Twitter
      open("https://twitter.com/intent/tweet?text=" + title + "&url=" + url,
           name, feature);
      break;
    case "Facebook": // Share on Facebook
      open("https://www.facebook.com/sharer/sharer.php?src=bm&v=4" +
           "&u=" + url + "&t=" + title, name, feature);
      break;
    case "Google+": // Share on Google+
      open("https://plus.google.com/share?url=" + url, name, feature);
      break;
    default:
      alert(decodeURIComponent(title) + "\n" + decodeURIComponent(url));
  }
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}
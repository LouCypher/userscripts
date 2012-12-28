/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name          USO: Forum Jumper
// @namespace     http://userstyles.org/users/12
// @description   Add links to jump to other forum
// @version       3.2
// @author        LouCypher
// @license       WTFPL http://sam.zoy.org/wtfpl/COPYING
// @updateURL     https://userscripts.org/scripts/source/137255.meta.js
// @include       https://userscripts.org/forums/*
// @include       https://userscripts.org/topics/*
// @include       http://userscripts.org/forums/*
// @include       http://userscripts.org/topics/*
// @include       http://userscripts.org./forums/*
// @include       http://userscripts.org./topics/*
// @include       http://greasefire.userscripts.org/forums/*
// @include       http://greasefire.userscripts.org/topics/*
// @include       http://greasefire.userscripts.org./forums/*
// @include       http://greasefire.userscripts.org./topics/*
// @exclude       *://*userscripts.org*/topics/new?script_id=*
// ==/UserScript==

/* Changelog:
    - 2012-07-05: v3.1 – Fixed style.
    - 2012-07-03: v3.0 – Added forum description.
    - 2012-07-02:
      - v2.1 – Fixed menu position when scrolling now works on all browsers.
      - v2.0 – Fixed menu position when scrolling (Mozilla only).
    - 2012-06-29: v1.0 – Initial release.
*/

(function() {
  var fLink = $("#mainmenu li a[href='/forums']");
  if (!fLink || fLink.parentNode.className != "active") return;

  var div = $("#right").appendChild(document.createElement("div"));
  div.id = "forum-jumper";
  div.className = "fixed";
  div.innerHTML = '<h5><a href="/forums">Jump to forum</a>:'
                + '<div class="info">This is a place to discuss'
                + ' Greasemonkey, JavaScript, and other ways of'
                + ' remixing the web and making it your own.</div></h5>'
                + '<ul>'
                + '<li><a href="/forums/1">Script development</a>'
                + '<div class="info">Stuck? Discuss problems,'
                + ' experiences and anything else related to'
                + ' development here.</div></li>'
                + '<li><a href="/forums/2">Ideas and script requests</a>'
                + '<div class="info">Have an idea for a killer script?'
                + ' Talk about it in here.</div></li>'
                + '<li><a href="/forums/3">Userscripts.org discussion</a>'
                + '<div class="info">Ideas or problems with the site?'
                + ' This is where to talk about them.</div></li>'
                + '<li><a href="/forums/5">Greasefire</a>'
                + '<div class="info">Discussions about the Firefox Addon'
                + ' that brings userscripts.org to Greasemonkey</div></li>'
                + '<li><a href="/forums/6">Jetpack</a>'
                + '<div class="info">Mozilla Lab\'s new project to extend'
                + ' your browser using JavaScript, HTML, jQuery and Firebug.'
                + '</div></li>'
                + '<li><a href="/forums/4">The Banana Bar</a>'
                + '<div class="info">A forum for general, off-topic chit-chat'
                + ' among monkeys.</div></li>'
                + '</ul>';

  var links = div.querySelectorAll("a");
  for (var i = 0; i < links.length; i++) {
    if ((links[i].textContent == $("#section h2").textContent) ||
        (links[i].href == $("#section .subtitle a").href)) {
      links[i].parentNode.className = "active";
    }
  }

  var style = $("head").appendChild(document.createElement("style"));
  style.type = "text/css";
  style.textContent = "#forum-jumper { width: inherit;"
                    + " position: relative; }\n"
                    + "#forum-jumper, #forum-jumper .info {"
                    + " background-color: inherit; padding-top: 1em; }\n"
                    + "#forum-jumper.fixed { position: fixed; }\n"
                    + "#forum-jumper h5 { margin-bottom: 1em; }\n"
                    + "#forum-jumper li a, "
                    + "#forum-jumper a:hover + .info { display: block; }\n"
                    + "#forum-jumper a, "
                    + "#forum-jumper a:hover {"
                    + " text-decoration: none !important; }\n"
                    + "#forum-jumper li { list-style-type: circle; }\n"
                    + "#forum-jumper li:not(.active):hover {"
                    + " list-style-type: disc; }\n"
                    + "#forum-jumper li.active { list-style-type: square;"
                    + " font-weight: bold; }\n"
                    + "#forum-jumper .info { display: none;"
                    + " position: absolute; top: +12em;"
                    + " font-weight: normal; }\n"
                    + "#forum-jumper li .info { margin-left: -2em; }";

  var divTop = div.offsetTop;
  fixToTop();
  addEventListener("scroll", fixToTop, false);

  function fixToTop() {
    if (pageYOffset >= divTop) {
      div.className = "fixed";
      div.style.top = "0";
    } else {
      div.removeAttribute("style");
      div.className = "";
    }
  }

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }
})()
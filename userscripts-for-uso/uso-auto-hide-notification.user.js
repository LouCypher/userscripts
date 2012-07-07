/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            USO: Auto hides notification
// @namespace       http://userstyles.org/users/12
// @version         1.0
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/COPYING
// @include         https://userscripts.org/*
// @include         http://userscripts.org/*
// @include         http://userscripts.org./*
// @include         http://greasefire.userscripts.org./*
// ==/UserScript==

(function() {
  var notice = $("#content p.notice span");
  if (!notice) return;

  var cssPrefix = getCSSPrefix();

  notice.parentNode.addEventListener("click", hide, false); // Click to hide
  setTimeout(function() {
    hide();
  }, 3000); // Hide after 3 seconds

  if (typeof GM_addStyle != "function") {
    function GM_addStyle(aCSS) {
      var style = $("head").appendChild(document.createElement("style"));
      style.type = "text/css";
      style.textContent = aCSS;
    }
  }

  function getCSSPrefix() {
    var ua = navigator.userAgent;
    if (/Firefox/.test(ua)) return "-moz-";
    if (/Opera/.test(ua)) return "-o-";
    if (/AppleWebKit/.test(ua)) return "-webkit-";
  }

  function hide() {
    notice.parentNode.setAttribute("style",
                                   cssPrefix + "animation: linear 1000ms; "
                                 + cssPrefix + "animation-name: slide; "
                                 + "margin-top: -40px; opacity: 0;");
    GM_addStyle("@" + cssPrefix + "keyframes slide {\
      from { margin-top: 0;     opacity: 1; }\
      to   { margin-top: -40px; opacity: 0; }\
    }")}

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }
})()
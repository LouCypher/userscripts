/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              kaskus-main-tennis@loucypher
// @name            Kaskus - Main Tennis - Slow Mimin
// @namespace       https://userscripts.org/users/12
// @description     Bikin Mimin jadi lemot.
// @version         1.0
// @author          LouCypher
// @license         WTFPL
// @icon            http://loucypher.github.io/userscripts/kaskus/kaskus-48.png
// @icon64URL       http://loucypher.github.io/userscripts/kaskus/kaskus-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Kaskus+-+Main+Tennis+-+Slow+Mimin
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/kaskus/main-tennis
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/kaskus/main-tennis/slow-mimin.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/kaskus/main-tennis/slow-mimin.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @run-at          document-start
// @include         http://www.kaskus.co.id/*
// @grant           unsafeWindow
// ==/UserScript==

window.addEventListener("beforescriptexecute", function(aEvent) {
  var script = aEvent.target;
  if (!script.src && script.textContent.match(/pong1/)) {
    window.removeEventListener(aEvent.type, arguments.callee, true);
    aEvent.preventDefault();
    document.addEventListener("DOMContentLoaded", function(aEvent) {
      unsafeWindow.$("#pong1").pong("", {
        ballSpeed: 10,
        compSpeed: 1,
        playerSpeed: 15,
        //playTo: 1,
        paddleHeight: 60
      });
      new MutationObserver(function(aMutations) {
        aMutations.forEach(function(aMutation) {
          if (aMutation.addedNodes[0].nodeType === 3) {
            if (aMutation.addedNodes[0].textContent === "you win!")
              unsafeWindow.$(aMutation.addedNodes[0]).before(
                '<img src="http://www.dab.hi-ho.ne.jp/joji/te/cheer.gif"/><br/>'
              );
          }
        });
      }).observe(unsafeWindow.$("#pong1 .score")[0], {childList:true});
    });
  }
});

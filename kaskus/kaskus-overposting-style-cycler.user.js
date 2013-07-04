/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name              Kaskus Overposting - style cycler
// @id                kaskus.overposting@loucypher
// @namespace         http://userscripts.org/users/12
// @description       Cycle between styles on Kaskus Overposting page.
// @version           1.2
// @author            LouCypher
// @license           WTFPL
// @icon              http://loucypher.github.io/userscripts/kaskus/kaskus-48.png
// @icon64URL         http://loucypher.github.io/userscripts/kaskus/kaskus-64.png
// @contributionURL   http://loucypher.github.io/userscripts/donate.html?Kaskus+Overposting
// @homepageURL       https://github.com/LouCypher/userscripts/tree/master/kaskus
// @supportURL        https://github.com/LouCypher/userscripts/issues
// @downloadURL       https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-overposting-style-cycler.user.js
// @updateURL         https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-overposting-style-cycler.user.js
// @resource          LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include           http://www.kaskus.co.id/*
// @grant             GM_addStyle
// ==/UserScript==

var wrapper = document.querySelector("[class*='wrap op']");
if (wrapper) {
  GM_addStyle("#cycler {\
    color: #999;\
    background: transparent;\
    font-size: large;\
    font-weight: bold;\
    text-decoration: none;\
    position: fixed;\
    top: 10px;\
    right: 20px;\
    z-index: 65535;\
    display: block;\
    padding: 0;\
    margin: 0;\
    outline-color: transparent;\
  }");
  var classList = wrapper.classList;
  var cycler = document.body.appendChild(document.createElement("a"));
  cycler.id = "cycler";
  cycler.title = "Cycle between styles";
  cycler.href = "";
  cycler.textContent = "\u274B";
  cycler.addEventListener("click", function(e) {
    e.preventDefault();
    var idx = parseInt(wrapper.className.match(/\d$/));
    if (classList.contains("op" + idx)) {
      classList.remove("op" + idx);
      classList.add("op" + (idx < 3 ? idx + 1 : 1));
    }
  }, false)
}

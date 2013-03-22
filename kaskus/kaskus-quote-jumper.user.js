/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name              Kaskus - Quote Jumper
// @id                kaskus.quote-jumper@loucypher
// @namespace         http://userscripts.org/users/12
// @description       Easily jump to post in quotes on a thread page.
// @include           /https?:\/\/(www|m|old)\.kaskus\.co\.id\/(((thread|post)\/)|showthread.php).*/
// @version           1.0
// @author            LouCypher
// @license           WTFPL
// @icon              http://loucypher.github.com/userscripts/kaskus/kaskus-48.png
// @icon64URL         http://loucypher.github.com/userscripts/kaskus/kaskus-64.png
// @contributionURL   http://loucypher.github.com/userscripts/donate.html?Kaskus+-+Quote+Jumper
// @homepageURL       https://github.com/LouCypher/userscripts/tree/master/kaskus
// @supportURL        https://github.com/LouCypher/userscripts/issues
// @downloadURL       https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-quote-jumper.user.js
// @updateURL         https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-quote-jumper.user.js
// @grant             none
// ==/UserScript==

var jumpers;
if (location.hostname == "old.kaskus.co.id") {
  jumpers = document.evaluate("//td[starts-with(@id, 'td_post')]//td[@class='alt2']//img[@class='inlineimg']/parent::a",
                              document, null, 6, null);
  if (jumpers.snapshotLength) {
    for (var i = 0; i < jumpers.snapshotLength; i++) {
      addClick(jumpers.snapshotItem(i));
    }
  }
} else {
  jumpers = document.querySelectorAll(".post-quote .jump");
  if (jumpers.length) {
    for (var i = 0; i < jumpers.length; i++) {
      addClick(jumpers[i]);
    }
  }
}

function addClick(aNode, aPrefixId) {
  aNode.addEventListener("click", function(e) {
    var node = e.target;
    while (node && node.nodeName != "A") node = node.parentNode;
    var href = node.href;
    var hash = href.match(/\#.*/);
    var id = hash.toString().replace(/\#/, "");
    if (document.getElementById(id)) {
      e.preventDefault();
      location.assign(hash);
    }
  }, false);
}
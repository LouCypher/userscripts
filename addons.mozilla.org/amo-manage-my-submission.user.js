/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// ==UserScript==
// @id              amo-manage-my-submission@loucypher
// @name            AMO: Manage My Submisions - View Listing Links
// @namespace       https://userscripts.org/users/12
// @description     Add/change add-ons view/edit link on AMO DevHub
// @version         1.0
// @author          LouCypher
// @license         MPL 2.0
// @icon            https://addons.cdn.mozilla.net/media//img/addon-icons/default-32.png
// @icon64URL       https://addons.cdn.mozilla.net/media//img/addon-icons/default-64.png
// @screenshot      https://lh4.googleusercontent.com/-VjOzeg6rw5c/Ulpo0aEAxlI/AAAAAAAAD2Y/Ee1wJLyVXsE/s0/amo-manage-my-submission.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?AMO%3A+Manage+My+Submisions
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/addons.mozilla.org
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/addons.mozilla.org/amo-manage-my-submission.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/addons.mozilla.org/amo-manage-my-submission.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @include         /^https://addons\.mozilla\.org/.*/developers/(addons|themes)(?=\?.*)?/
// @grant           GM_addStyle
// ==/UserScript==

GM_addStyle('.icon-edit {\
  display: inline-block;\
  width: 12px;\
  height: 12px;\
  background: url("data:image/png;base64,\
iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A\
/wD/oL2nkwAAAc1JREFUKM91Ut1LU3EYfn6/386mTYfz40KKJIK2bBWSKNT6AocXtcpcH2ygFxJ1\
2U230kU34YX/gSDSB46hbEh2oVSGWV5UKAZjRbg13ZxnenY8up1zfLsqpOYL793zvDwfLyMi7DeD\
jx7fPpmc6T+c/HKiKKzv1cTqPRBR2cWNb4HrTz/SUuI7lSZGjNL98/T1OGZ4ucusK+6rcdufOZo9\
+LRRay63dAq1ocm078Jr+Q8civudx6RI96VaaUNWqC+aFH2nDNPXFhIHFn58Zns9sOCS33nIGgl0\
NEpqvkDj71LYTsuAkmfnPMDF3PS1vwTmn/c5XY6JQMdBSStsm2Nvl4WWkQnyOkO1pKOghmiqN8wB\
oOnB5K16t32y63KjpClbFJtNC20lbyK3xlAlDFZp+GmqNwwAHEPM1SwWXp5udXNzp0jRuSyUlTxh\
PSvgEDqs+s3dF3de/5HNF7UL3oFOlVekF43nb9bYTlYGMqsM1dBhKXZTOBjbGwrfkmqCHu9ZDLeH\
2VEjYehpjYmqEnGbepUiPbF/UxRXfG3DR+oU6D9H+Rn7Lx7PpshmY3dzow+j5TqyvJrPGJupOa3S\
lKeLhfGxDy7M4gkl9nuX3yY23IFrR7ElAAAAAElFTkSuQmCC") 0 0 no-repeat;\
  margin-left: .5em\
}');

var items = $$("#sorter + .items > .item.addon > .info");
if (items.length) {
  var editLink, viewLink, tooltip;
  for (var i = 0; i < items.length; i++) {
    editLink = $("h3 a", items[i]);
    if (editLink) {
      tooltip = $("a.tooltip", items[i]);
      editLink.parentNode.appendChild(addLink(editLink.getAttribute("href"), tooltip.title));
      viewLink = $(".more-actions-popup > ul:last-child > li a");
      if (viewLink) {
        editLink.href = viewLink.getAttribute("href");
        editLink.title = viewLink.textContent;
        editLink.classList.add("tooltip");
      }
      else
        editLink.href = "/" + document.documentElement.lang + "/" + document.body.dataset.app
                      + editLink.href.match(/\/(addon|theme)\/.*\//)[0].toString()
                                     .replace(/\/theme\//, "/addon/");
    }
  }
}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function $$(aSelector, aNode) {
  return (aNode || document).querySelectorAll(aSelector);
}

function addLink(aHref, aTitle) {
  var link = document.createElement("a");
  link.href = aHref;
  link.className = "icon-edit tooltip";
  link.title = aTitle;
  return link;
}

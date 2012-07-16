/*
    Add Flattr button on GitHub.com
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name          GitHub: Add Flattr button
// @namespace     https://github.com/LouCypher
// @description   Add Flattr button on GitHub.com
// @version       7.0
// @author        LouCypher
// @license       GPL
// @icon          http://i.imgur.com/VDx96.png
// @updateURL     https://userscripts.org/scripts/source/137434.meta.js
// @include       https://github.com/*
// @exclude       https://github.com/dashboard/*
// ==/UserScript==

/*
    Changelog:
      - 2012-07-16
          v7.0:
            - Don't add Flattr button on specific pages.
            - Fixed 'committer is null' error.
      - 2012-07-15
          v6.0: Don't add Flattr button on user's dashboard.
          v5.0: Don't add Flattr button on repo admin page.
      - 2012-07-07
          v4.0: Don't add Flattr button on your own commit.
          v4.0b:
            - Added Flattr button on commit page.
            - Reduced Flattr icon size.
          v3.0: Don't add Flattr button on organizations.
      - 2012-07-02
          v2.0: Fixed something.
      - 2012-07-01
          v1.0: Initial release.
*/

(function() {
  var ul = $(".site ul.pagehead-actions");
  if (!ul ||

      // Thou shalt not Flattreth thyself.
      ($("li.text", ul) && ($("li.text", ul).textContent == "This is you!")) ||

      // Thou canst not Flattreth organizations.
      // http://blog.flattr.net/2012/02/winter-update-github-tweets-extensions/#comment-8471
      $(".pagehead > .avatared > .organization-bit") ||

      $("li a.minibutton.btn-back", ul)

     ) return;

  var username = $(".username");
  var repoName = location.href.match(/[^(\.com\/)]\w+\/.[^\/]*/);
  if (!(repoName || username)) return;

  var permalink = $(".js-current-repository");
  var url = permalink ? permalink.href : location.href;

  var name = repoName ? repoName.toString() : username.textContent;

  if (!$("li.for-owner", ul)) { // Thou shalt not Flattreth thine own repo.
    var li = ul.insertBefore(document.createElement("li"),
                             $("li.text", ul) ? $("li.text", ul).nextSibling
                                              : ul.firstChild);
    li.appendChild(flattrButton(url, "Flattr " + name, "minibutton"));
  }

  var container = $("#js-repo-pjax-container");
  var committer = $(".authorship .author-name a", container);
  var user = $("#user .name"); // Logged in.

  // Thou shalt not Flattreth thine own commit.
  if (user && committer && (user.href == committer.href)) return;

  var bb = $(".commit > .browse-button", container);
  bb && (bb.style.marginLeft = ".5em")
     && bb.parentNode.insertBefore(flattrButton(location.href,
                                                "Flattr this commit!",
                                                "browse-button"),
                                   bb.nextSibling);

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }

  // Flattr button
  function flattrButton(aURL, aTitle, aClassName) {
    var link = document.createElement("a");
    link.href = "https://flattr.com/submit/auto?url="
              + encodeURIComponent(aURL);
    link.title = aTitle;
    link.className = aClassName;
    link.target = "_blank";
    link.setAttribute("data-flattr-uid", "flattr");
    link.setAttribute("data-flattr-category", "software");
    link.setAttribute("data-flattr-tags", "software, github, opensource");
    link.innerHTML = '<img src="'
                   + 'https://api.flattr.com/button/flattr-badge-small.png"'
                   + ' alt="Flattr!" style="width: 12px; height: 12px;'
                   + ' vertical-align: -1px; margin-right: .5em; "/>Flattr!';
    return link;
  }
})()
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
// @version       4.0b
// @author        LouCypher
// @licensed      GPL
// @icon          http://i.imgur.com/VDx96.png
// @updateURL     https://userscripts.org/scripts/source/137434.meta.js
// @include       https://github.com/*
// ==/UserScript==

/*
    Changelog:
      - 2012-07-07
          v4.0b:
            - Added Flattr button on commit page.
            - Reduced Flattr icon size.
          v3.0: Don't Flattr organizations.
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

      // Thou shalt not Flattreth thine own repo.
      $("li.for-owner", ul) ||

      // Thou canst not Flattreth organizations.
      // http://blog.flattr.net/2012/02/winter-update-github-tweets-extensions/#comment-8471
      $(".pagehead > .avatared > .organization-bit")

     ) return;

  var username = $(".username");
  var repoName = location.href.match(/[^(\.com\/)]\w+\/.[^\/]*/);
  if (!(repoName || username)) return;

  var permalink = $(".js-current-repository");
  var url = permalink ? permalink.href : location.href;

  var name = repoName ? repoName.toString() : username.textContent;

  var li = ul.insertBefore(document.createElement("li"),
                           $("li.text", ul) ? $("li.text", ul).nextSibling
                                            : ul.firstChild);
  li.appendChild(flattrButton(url, "Flattr " + name, "minibutton"));

  var bb = $("#js-repo-pjax-container > .commit > .browse-button");
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
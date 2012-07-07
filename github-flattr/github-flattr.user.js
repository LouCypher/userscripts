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
// @version       3.0
// @author        LouCypher
// @licensed      GPL
// @icon          http://i.imgur.com/VDx96.png
// @updateURL     https://userscripts.org/scripts/source/137434.meta.js
// @include       https://github.com/*
// ==/UserScript==

/*
    Changelog:
      - 2.0 (2012-07-02): Fixed something.
      - 1.0 (2012-07-01): Initial release.
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
  li.id = "flattr-button";
  li.innerHTML = '<a href="https://flattr.com/submit/auto?url='
               + encodeURIComponent(url) + '" class="minibutton"'
               + ' target="_blank" title="Flattr ' + name + '"'
               + ' data-flattr-uid="flattr"'
               + ' data-flattr-tags="software, github, opensource"'
               + ' data-flattr-category="software"><img src="'
               + '//api.flattr.com/button/flattr-badge-small.png"'
               + ' alt="Flattr!" style="vertical-align: -3px;'
               + ' margin-right: 0.5em; width: 16px; height: 16px;"/>'
               + 'Flattr!</a>';

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }
})()
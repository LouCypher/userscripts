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
// @version       12.1
// @author        LouCypher
// @license       GPL
// @icon          http://i.imgur.com/VDx96.png
// @resource      license https://github.com/LouCypher/userscripts/raw/master/github-flattr/LICENSE.txt
// @updateURL     https://userscripts.org/scripts/source/137434.meta.js
// @include       https://github.com/*
// @include       https://gist.github.com/*
// @exclude       https://github.com/dashboard/*
// @grant         none
// ==/UserScript==

/*
    Changelog:
      - 2012-09-24
          v12: Updated button on user's profile page.
      - 2012-07-27
          v11.0: Updated to new repo layout.
      - 2012-07-26
          v10.0: Fixed: incorrect commit URL.
      - 2012-07-19
          v9.1: Another CSS fix.
      - 2012-07-18
          v9.0:
            - Fixed Flattr button style on gist.
            - Refactored.
      - 2012-07-17
          v8.0: Includes gist.github.com (public gist only).
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
  var isGist = location.hostname == "gist.github.com";
  var buttons = isGist ? $("#repos .repo.public .path") // public gist
                       : $(".site ul.pagehead-actions") ||
                         $(".user-following-container");
  if (!buttons ||

      // Thou shalt not Flattreth thyself.
      ($("li.text", buttons) && ($("li.text", buttons).textContent == "This is you!")) ||

      // Thou canst not Flattreth organizations.
      // http://blog.flattr.net/2012/02/winter-update-github-tweets-extensions/#comment-8471
      $(".pagehead > .avatared > .organization-bit") ||

      $("li a.minibutton.btn-back", buttons)

     ) return;

  var url = location.href;

  if (isGist) {
    var owner = $("#owner .name a"), user = $(".userbox .name");
    if (user && (user.href == owner.href)) return; // Thou shalt not Flattreth thine own snippet.

    var button = insertBefore(flattrButton(url.match(/^https:\/\/gist.github.com\/\w+/)),
                              buttons.lastChild, buttons);
    button.setAttribute("style",
                        "color: rgba(0, 0, 0, .8); width: 80px; "
                      + "height: 18px; font-size: 13px; font-weight: bold; "
                      + "margin-left: .75em; vertical-align: 1px; "
                      + "padding: 0 1em 0 2em; border: 1px solid #8b8b8b; "
                      + "-moz-border-radius: 2em; -o-border-radius: 2em; "
                      + "-webkit-border-radius: 2em; border-radius: 2em; "
                      + "background-image: url('https://api.flattr.com/button/"
                      + "flattr-badge-small.png'), " + getCSSPrefix()
                      + "linear-gradient(top, #fff, #ddd); "
                      + "background-position: .75em center, 0 0; "
                      + "background-repeat: no-repeat, repeat-x; "
                      + "background-size: 10px 10px, 80px 18px; "
                      + "text-decoration: none;");
    return;
  }

  var username = $(".avatared > h1 > em") || $(".avatared > h1 > .name-only");
  var repoName = url.match(/[^(\.com\/)]\w+\/.[^\/]*/);
  if (!(repoName || username)) return;

  var permalink = $(".js-current-repository");

  var name = repoName ? repoName.toString() : username.textContent;

  if (buttons.nodeName == "SPAN") {
    url = location.href.replace(location.search, "");
    var span = insertBefore(document.createElement("span"),
                            buttons.firstChild, buttons);
    span.appendChild(flattrButton(url, "Flattr " + name, "minibutton"));

  } else if (!$(".repohead ul.tabs li:last-child a[href$='admin']")) {
  // Thou shalt not Flattreth thine own repo.
    var li = insertBefore(document.createElement("li"),
                          $("li.text", buttons) ? $("li.text", buttons).
                                                  nextSibling
                                                : buttons.firstChild,
                          buttons);
    li.appendChild(flattrButton(permalink ? permalink.href : url,
                                "Flattr " + name, "minibutton"));
  }

  var container = $("#js-repo-pjax-container");
  var committer = $(".authorship .author-name a", container);
  var user = $("#user .name"); // Logged in.

  // Thou shalt not Flattreth thine own commit.
  if (user && committer && (user.href == committer.href)) return;

  var browse = $(".commit > .browse-button", container);
  browse && (browse.style.marginLeft = ".5em")
         && insertBefore(flattrButton(url, "Flattr this commit!", "browse-button"),
                         browse.nextSibling,
                         browse.parentNode);

  function $(aSelector, aNode) {
    return (aNode ? aNode : document).querySelector(aSelector);
  }

  function insertBefore(aNode, aSibling, aParent) {
    return aParent.insertBefore(aNode, aSibling);
  }

  function getCSSPrefix() {
    var ua = navigator.userAgent;
    if (/Firefox/.test(ua)) return "-moz-";
    if (/Opera/.test(ua)) return "-o-";
    if (/AppleWebKit/.test(ua)) return "-webkit-";
  }

  // Flattr button
  function flattrButton(aURL, aTitle, aClassName) {
    var link = document.createElement("a");
    link.href = "https://flattr.com/submit/auto?url="
              + encodeURIComponent(aURL);
    link.title = aTitle ? aTitle : "";
    link.className = aClassName ? aClassName : "";
    link.target = "_blank";
    link.setAttribute("data-flattr-uid", "flattr");
    link.setAttribute("data-flattr-category", "software");
    link.setAttribute("data-flattr-tags", "software, github, opensource");
    link.innerHTML = isGist
                     ? "Flattr"
                     : '<img src="'
                     + 'https://api.flattr.com/button/flattr-badge-small.png"'
                     + ' alt="Flattr!" style="width: 12px; height: 12px;'
                     + ' vertical-align: -1px; margin-right: .5em; "/>Flattr!';
    return link;
  }
})()
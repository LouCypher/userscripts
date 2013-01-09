/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            Twitter Settings sub-menu
// @namespace       http://userscripts.org/users/12
// @description     Add sub-menu in Twitter settings menu for quick access.
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/twitter-settings-submenu.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/twitter-settings-submenu.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://twitter.com/*
// @include         https://twitter.com/*
// @grant           GM_addStyle
// ==/UserScript==

(function() {
  var setting = document.querySelector('.dropdown-menu > li > a.js-nav[data-nav="settings"]');
  if (!setting) return;

  var submenu = setting.parentNode.insertBefore(document.createElement("ul"), setting);
  submenu.id = "sub-menu";
  submenu.className = "dropdown-menu";
  submenu.innerHTML = '<li><a data-nav="settings" href="/settings/account">'
                    + 'Account</a></li>'
                    + '<li><a data-nav="settings" href="/settings/password">'
                    + 'Password</a></li>'
                    + '<li><a data-nav="settings" href="/settings/devices">'
                    + 'Mobile</a></li>'
                    + '<li><a data-nav="settings" href="/settings/notifications">'
                    + 'Email notifications</a></li>'
                    + '<li><a data-nav="settings" href="/settings/profile">'
                    + 'Profile</a></li>'
                    + '<li><a data-nav="settings" href="/settings/design">'
                    + 'Design</a></li>'
                    + '<li><a data-nav="settings" href="/settings/applications">'
                    + 'Apps</a></li>'
                    + '<li><a data-nav="settings" href="/settings/widgets">'
                    + 'Widgets</a></li>';

  if (typeof GM_addStyle != "function") {
    function GM_addStyle(aCSS) {
      var style = document.head.appendChild(document.createElement("style"));
      style.type = "text/css";
      style.textContent = aCSS;
    }
  }
  GM_addStyle('#sub-menu {\n\
    display: none;\n\
    background-color: white;\n\
    position: absolute;\n\
    margin: -2.2em -9em;\n\
    padding: .5em 0;\n\
  }\n\
  li:hover > #sub-menu { display: block; }');
})()
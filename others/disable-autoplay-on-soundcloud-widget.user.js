/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @id              disable-autoplay-on-soundcloud-widget@loucypher
// @name            Disable Auto-play on SoundCloud Widget
// @namespace       http://userscripts.org/users/12
// @description     Disable auto-play on SoundCloud widget
// @version         1.0a1
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Disable+auto-play+on+SoundCloud+Widget
// @homepageURL     https://github.com/LouCypher/userscripts
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/disable-autoplay-on-soundcloud-widget.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/disable-autoplay-on-soundcloud-widget.user.js
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         https://w.soundcloud.com/player/?*auto_play=true*
// @run-at          document-start
// @grant           none
// ==/UserScript==

var regx = /(\?|\&)auto_play\=true/;
if (regx.test(location.href))
  location.replace(location.href.replace(regx, ""));

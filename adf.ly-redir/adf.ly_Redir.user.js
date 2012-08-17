/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            adf.ly Redir
// @namespace       http://userscripts.org/users/12
// @description     Redirect adf.ly to its target location.
// @version         2.0
// @author          LouCypher
// @license         WTFPL http://sam.zoy.org/wtfpl/
// @updateURL       https://userscripts.org/scripts/source/141047.meta.js
// @resource        license https://github.com/LouCypher/userscripts/raw/master/adf.ly-redir/LICENSE.txt
// @include         http://adf.ly/*
// @exclude         http://adf.ly/go/*
// @grant           none
// ==/UserScript==

(function() {
  if (/blocked/.test(location.pathname)) {
    redir(sessionStorage.getItem("adfly_redirURL"));
    return;
  }
  var script = document.head.querySelector("script:not([src])");
  if (!script) return;
  var url = script.textContent.match(/\/go\/.*(?=')/);
  if (!url) return;
  url = url.toString();
  sessionStorage.setItem("adfly_redirURL", url);
  redir(url);
  function redir(aURL) {
    document.title = "Redirecting\u2026";
    document.body.textContent = document.title;
    location.replace(location.href.replace(location.pathname, aURL));
  }
})()
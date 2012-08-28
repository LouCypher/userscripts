/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */

// ==UserScript==
// @name            userstyles.org: Trim Extra Lines from Style Code
// @namespace       http://userscripts.org/users/12
// @version         3.0
// @author          LouCypher
// @license         WTFPL
// @include         http://userstyles.org/styles/*
// @grant           unsafeWindow
// ==/UserScript==

setTimeout(function() {
  var codeElement = document.getElementById('stylish-code');
  codeElement.textContent = codeElement.textContent.replace(/\r/g, "");
}, 1000)

var w = unsafeWindow;
w.loadCode = function loadCode(callback, promptOnIncomplete) {
  var codeElement = document.getElementById('stylish-code');
  var text;
  var options = w.getOptions(promptOnIncomplete);
  if (options == null) {
    return false;
  }
  if ("textContent" in codeElement)
    text = codeElement.textContent.replace(/\r/g, "");
  else
    text = codeElement.innerText.replace(/\r/g, "");
  if (text.length > 0 && options == w.currentOptions) {
    if (callback) {
      callback();
    }
    return false;
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/styles/' + w.getId() + '.css' + (options == "" ? "" : "?" + options), true);
  xhr.onreadystatechange = function(event) {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        var responseText = xhr.responseText.replace(/\r/g, "");
        if ("textContent" in codeElement)
          codeElement.textContent = responseText;
        else
          codeElement.innerText = responseText;
        w.currentOptions = options;
        if (callback)
          callback();
      } else {
        throw 'Sorry, an error occurred loading the code - status ' + xhr.status + '.';
      }
      document.body.style.cursor = "";
    }
  }
  document.body.style.cursor = "wait";
  xhr.send(null);
  return true;
}
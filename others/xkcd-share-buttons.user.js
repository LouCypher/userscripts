/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name            xkdc: Share Buttons
// @namespace       http://userscripts.org/users/12
// @description     Add buttons on xkcd.com to share on Twitter, Tumblr, Pinterest, etc.
// @version         2.0
// @author          LouCypher
// @license         WTFPL http://www.wtfpl.net/
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/xkcd-share-buttons.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/xkcd-share-buttons.user.js
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include         http://xkcd.com/*
// @include         https://xkcd.com/*
// @grant           none
// ==/UserScript==

(function() {
  if (!$(".comicNav a[rel='prev']")) return;

  if (location.pathname == "/") {
    var id = parseInt($(".comicNav a[rel='prev']").href.match(/\d+/)) + 1;
  }

  var title = $("#ctitle");
  var image = $("#comic img");

  if (!(title && image)) return;

  var txt = $esc(document.title);
  var img = $esc(image.src);
  var alt = $esc(image.title);
  var url = $esc(location.href + (id ? (id + "/") : ""));

  var ul = $("#middleContainer").insertBefore(document.createElement("ul"),
                                              $("#middleContainer > br"));
  ul.className = "comicNav";

  var web = [
    { "name": "Google+",
      "url" : "https://plus.google.com/share?url=" + url,
      "bgcolor": "#dc4a36", "color": "#fff" },

    { "name": "Facebook",
      "url" : "https://www.facebook.com/share.php?src=bm&v=4&u=" + url,
      "bgcolor": "#3b5998", "color": "#fff" },

    { "name": "LinkedIn",
      "url" : "http://www.linkedin.com/shareArticle?url=" + url +
              "&title=" + txt + "&summary=" + alt,
      "bgcolor": "#52a9d4", "color": "#fff" },

    { "name": "Twitter",
      "url" : "https://twitter.com/share?text=" + txt + "&url=" + url +
      "&related=irandallmunroe:Randall+Munroe&hashtags=xkcd,comic",
      "bgcolor": "#019ad2", "color": "#fff" },

    { "name": "Tumblr",
      "url" : "http://www.tumblr.com/share/photo?source=" + img +
              "&caption=" + $p("<strong>" + document.title +
              "</strong>") + $p(image.title) +
              "&click_thru=" + url + "&tags=xkcd,comic",
      "bgcolor": "#2c4965", "color": "#fff" },

    { "name": "Pinterest",
      "url" : "http://pinterest.com/pin/create/button/?url=" + url +
              "&media=" + img + "&description=" + txt,
      "bgcolor": "#fff", "color": "#e0242a" },

    { "name": "RebelMouse",
      "url" : "https://www.rebelmouse.com/core/stick/?image=" + img +
              "&image_size=" + image.width + "x" + image.height +
              "&headline=" + txt + "&original_url=" + url + "&type=image",
      "bgcolor": "#145a7c", "color": "#fff" },

    { "name": "StumbleUpon",
      "url" : "http://www.stumbleupon.com/submit?url=" + url,
      "bgcolor": "#fc3d2f", "color": "#fff" },

    { "name": "FriendFeed",
      "url" : "http://friendfeed.com/?url=" + url + "&title=" + txt,
      "className": "FriendFeed",
      "bgcolor": "#437ec7", "color": "#c1d7f4" },

    { "name": "reddit",
      "url" : "http://www.reddit.com/submit?url=" + url + "&title=" + txt,
      "bgcolor": "#cee3f8", "color": "#000" }
  ]

  var list;
  for (var i in web) {
    list = $button(web[i].name, web[i].url, web[i].className,
                 web[i].bgcolor, web[i].color);
    ul.appendChild(list);
    if (i == parseInt((web.length / 2) - 1)) {
      var br = list.appendChild(document.createElement("br"));
      br.style.lineHeight = "3em";
    }
  }

  $(".comicNav .FriendFeed").addEventListener("click", $ff, false);

  function $(aSelector, aNode) {
    return (aNode || document).querySelector(aSelector);
  }

  function $esc(aString) {
    return encodeURIComponent(aString);
  }

  function $button(aText, aURL, aClass, aBgColor, aColor) {
    var list = document.createElement("li");
    var link = list.appendChild(document.createElement("a"));
    link.href = aURL;
    link.textContent = aText;
    link.title = "Share on " + aText;
    link.target = "_blank";
    aClass && link.classList.add(aClass);
    link.style.backgroundColor = aBgColor;
    link.style.color = aColor;
    return list;
  }

  function $p(aString) {
    return $esc("<p>" + aString + "</p>");
  }

  function $ff(aEvent) {
    aEvent.preventDefault();
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", "//friendfeed.com/share/bookmarklet/javascript");
    document.body.appendChild(script)
  }
})()
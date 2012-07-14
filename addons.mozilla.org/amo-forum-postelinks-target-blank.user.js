// ==UserScript==
// @name           AMO Forum: Open posted links in new tab
// @namespace      http://mozilla.status.net/loucypher
// @include        https://forums.mozilla.org/addons/viewtopic.php*t=*
// @include        https://forums.mozilla.org/addons/viewtopic.php*p=*
// ==/UserScript==

let postlinks = document.querySelectorAll("#page-body .postlink");
if (!postlinks.length) return;
for (var i = 0; i < postlinks.length; i++) {
  postlinks[i].target = "_blank";
}
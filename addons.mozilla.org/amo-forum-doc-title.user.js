// ==UserScript==
// @name          AMO Forum Document Title
// @namespace     https://userscripts.org/users/12
// @include       https://forums.mozilla.org/addons/*.php*
// @exclude       https://forums.mozilla.org/addons/index.php*
// @grant         none
// ==/UserScript==

var title = document.title.replace(/^Mozilla Add-ons Forum\s(\-|\u2022)\s/, "");

if (/^View (forum|topic)/.test(title))
  title = title.replace(/^View (forum|topic)\s\-\s/, "");

if (/^Viewing profile/.test(title))
  title = title.replace(/^Viewing profile\s\-\s/, "");

if (/^User Control Panel/.test(title))
  title = title.replace(/^User Control Panel\s\u2022\s/, "") + " \u2022 User Control Panel";

document.title = title + " \u2022 Mozilla Add-ons Forum";

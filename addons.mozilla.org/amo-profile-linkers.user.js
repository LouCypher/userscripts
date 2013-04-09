// ==UserScript==
// @name            AMO Profile Linkers
// @namespace       http://userstyles.org/users/12
// @version         1.3
// @author          LouCypher
// @license         free
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/addons.mozilla.org/amo-profile-linkers.user.js
// @include         https://addons.mozilla.org/*/user/*
// @include         https://forums.mozilla.org/addons/viewtopic.php*
// @include         https://forums.mozilla.org/addons/memberlist.php*mode=viewprofile*
// ==/UserScript==

if (location.hostname == "addons.mozilla.org") {

  var table = $("table.person-info");
  if (!table) return;
  var row = $("tbody > tr:nth-child(3)", table);
  var newRow = row.parentNode.insertBefore($new("tr"), row.nextSibling);
  var username = $(".fn.n", table).textContent;
  var id = $id(location.pathname) || $(".secondary.user-avatar").dataset.userId;
  newRow.innerHTML = '<th>Forums</th>\
<td><a href="https://forums.mozilla.org/addons/memberlist.php?' + 
'mode=viewprofile&u=' + id + '">View profile</a></td>';

} else if (location.pathname == "/addons/memberlist.php") {

  var profile = $("#viewprofile");
  if (!profile) return;
  var link = $amo($id($("a[href*='search.php?author_id=']", profile).href));
  link.textContent = link.href;
  var dl1 = $(".post-content > .details", profile);
  dl1.appendChild($new("dt"));
  var dd1 = dl1.appendChild($new("dd"));
  var link2 = dd1.appendChild($new("a"));
  link2.href = link.href + "abuse";
  link2.innerHTML = "<strong>Report user</strong>";
  var dl2 = $(".post-content > h3 + .details", profile);
  var dd2 = dl2.insertBefore($new("dd"), dl2.firstChild);
  dd2.appendChild(link);
  var dt = dl2.insertBefore($new("dt"), dd2);
  dt.textContent = "AMO profile:";

} else if (location.pathname == "/addons/viewtopic.php") {

  var profiles = document.querySelectorAll(".post [id^='profile'] .profile-top");
  if (!profiles.length) return;
  for (var i = 0; i < profiles.length; i++) {
    let id = $id($(".profile-link", profiles[i]).href);
    let list = $(".profile-buttons > ul > li", profiles[i]);
    let list1 = list.parentNode.insertBefore($new("li"), list.nextSibling);
    let link1 = list1.appendChild($amo(id));
    link1.textContent = "AMO profile";
    let list2 = list.parentNode.insertBefore($new("li"), list1.nextSibling);
    let link2 = list2.appendChild($amo(id, "abuse"));
    link2.textContent = "Report user";
  }

}

function $(aSelector, aNode) {
  return (aNode || document).querySelector(aSelector);
}

function $new(aElement) {
  return document.createElement(aElement);
}

function $id(aURL) {
  var num = aURL.match(/\d+/);
  if (num) return num.toString();
  else return null;
}

function $amo(aId, aPath) {
  var link = $new("a");
  link.href = "https://addons.mozilla.org/user/" +
              aId + "/" + (aPath ? aPath : "");
  return link;
}
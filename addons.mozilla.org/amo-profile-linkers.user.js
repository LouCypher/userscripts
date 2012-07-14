// ==UserScript==
// @name            AMO Profile Linkers
// @namespace       http://userstyles.org/users/12
// @version         1.2
// @author          LouCypher
// @license         free
// @downloadURL     https://gist.github.com/raw/1054254/amo-profile-linkers.user.js
// @include         https://addons.mozilla.org/*/user/*
// @include         https://forums.mozilla.org/addons/viewtopic.php*
// @include         https://forums.mozilla.org/addons/memberlist.php*mode=viewprofile*
// ==/UserScript==

if (location.hostname == "addons.mozilla.org") {

  var table = $qry("table.person-info");
  if (!table) return;
  var row1 = $qry("tbody > tr:first-child", table);
  var newRow = row1.parentNode.insertBefore($new("tr"), row1.nextSibling);
  var username = $qry(".fn.n", table).textContent;
  var id = $id(location.pathname);
  newRow.innerHTML = '<th>Forums</th>\
<td><a href="https://forums.mozilla.org/addons/memberlist.php?' + 
'mode=viewprofile&u=' + id + '">View profile</a></td>';

} else if (location.pathname == "/addons/memberlist.php") {

  var profile = $qry("#viewprofile");
  if (!profile) return;
  var link = $amo($id($qry("a[href*='search.php?author_id=']", profile).href));
  link.textContent = link.href;
  var dl1 = $qry(".post-content > .details", profile);
  dl1.appendChild($new("dt"));
  var dd1 = dl1.appendChild($new("dd"));
  var link2 = dd1.appendChild($new("a"));
  link2.href = link.href + "abuse";
  link2.innerHTML = "<strong>Report user</strong>";
  var dl2 = $qry(".post-content > h3 + .details", profile);
  var dd2 = dl2.insertBefore($new("dd"), dl2.firstChild);
  dd2.appendChild(link);
  var dt = dl2.insertBefore($new("dt"), dd2);
  dt.textContent = "AMO profile:";

} else if (location.pathname == "/addons/viewtopic.php") {

  var profiles = document.querySelectorAll(".post [id^='profile'] .profile-top");
  if (!profiles.length) return;
  for (var i = 0; i < profiles.length; i++) {
    let id = $id($qry(".profile-link", profiles[i]).href);
    let list = $qry(".profile-buttons > ul > li", profiles[i]);
    let list1 = list.parentNode.insertBefore($new("li"), list.nextSibling);
    let link1 = list1.appendChild($amo(id));
    link1.textContent = "AMO profile";
    let list2 = list.parentNode.insertBefore($new("li"), list1.nextSibling);
    let link2 = list2.appendChild($amo(id, "abuse"));
    link2.textContent = "Report user";
  }

}

function $qry(aSelector, aNode) {
  return (aNode ? aNode : document).querySelector(aSelector);
}

function $new(aElement) {
  return document.createElement(aElement);
}

function $id(aURL) {
  return aURL.match(/\d+/).toString();
}

function $amo(aId, aPath) {
  var link = $new("a");
  link.href = "https://addons.mozilla.org/user/" +
              aId + "/" + (aPath ? aPath : "");
  return link;
}
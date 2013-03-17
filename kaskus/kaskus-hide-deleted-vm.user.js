/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name              Kaskus - Hide Deleted VM
// @id                kaskus.vm@loucypher
// @namespace         http://userscripts.org/users/12
// @description       Hide deleted VM on your profile page.
// @version           4.0
// @author            LouCypher
// @license           WTFPL http://www.wtfpl.net/
// @icon              http://loucypher.github.com/userscripts/kaskus/kaskus-48.png
// @icon64URL         http://loucypher.github.com/userscripts/kaskus/kaskus-64.png
// @contributionURL   http://loucypher.github.com/userscripts/donate.html?Kaskus+-+Hide+Deleted+VM
// @homepageURL       https://github.com/LouCypher/userscripts/tree/master/kaskus
// @supportURL        https://github.com/LouCypher/userscripts/issues
// @downloadURL       https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-hide-deleted-vm.user.js
// @updateURL         https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-hide-deleted-vm.user.js
// @resource          LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include           /^https?:\/\/www\.kaskus\.co\.id\/profile\/[0-9]+$/
// @run-at            document-start
// @grant             unsafeWindow
// ==/UserScript==

var msg = "Kaskus:";
if (isMyProfile(getUserId())) start();
console.log(msg);

function getUserId() {
  var userid = "";
  document.cookie.split(";").forEach(function(cookie) {
    if (/userid/.test(cookie)) {
      userid = cookie.match(/\d+/).toString();
    }
  })
  msg += (userid ? "\n* You have " : " You're NOT ") + "logged in.";
  return userid;
}

function isMyProfile(aUserId) {
  var mine = false;
  if (location.href.match(/\d+$/) == aUserId) {
    mine = true;
  }
  if (aUserId) {
    msg += "\n* This is" + (mine ? " " : " NOT ") + "your profile page.";
  }
  return mine;
}

function start() {
  unsafeWindow.hideDeleted = true;
  window.addEventListener('afterscriptexecute', process, true);
}

function process(aEvent) {
  if (/profile.js$/.test(aEvent.target.src)) {
    window.removeEventListener(aEvent.type, arguments.callee, true);
    var $ = unsafeWindow.$;

    function getVM(b) {
      b && $("#do-see-more-updates").remove();
      var profile = $("#profile-content");
      profile.append('<div class="item" style="text-align:center"' +
                     ' id="ajax_loader_html"><img src="http://kkcdn' +
                     '-static.kaskus.co.id/img/ajax-loader.gif"/></div>');
      $.getJSON("/profile/stream_activity_vm/all/" + (b ? b : "0") + "/" +
                $("#userid").val(), function(c) {
        $("#ajax_loader_html").remove("");
        $.each(c.stream_activity, function(e, f) {
          var deleted = /deleted\-vm/.test(f.content);
          var hideDeleted = unsafeWindow.hideDeleted;
          var html = '<div class="item' +
                     (deleted ? ' deleted' : '') +
                     (deleted && hideDeleted ? ' hide' : '') +
                     '" id="vm_' + f.vmid + '"><div class="item-content">' +
                     '<a href="#vm_' + f.vmid + '" class="entry-head">' +
                     '<i class="icon-star"></i></a>' + f.profilepic +
                     '<div class="message"><div class="vcard">' + f.username +
                     f.date + '</div>' + f.content + '</div></div>';
          if (f.button_action != "") {
            html += '<div class="m-meta">' + f.button_action + "</div>"
          }
          html += "</div>";
          profile.append(html);
          if (c.stream_activity.length - 1 == e && f.username != "") {
            profile.append('<div class="load-more"><a href="javascript:void(0);' +
                           '" id="do-see-more-updates" onclick="see_more_vm(\'' +
                           c.oldest_id + '\'); return false;" class="button' +
                           ' small white">Load More updates</a></div>')
          }
        })
      })
    }
    unsafeWindow.getVM = unsafeWindow.see_more_vm = getVM;
  }
}
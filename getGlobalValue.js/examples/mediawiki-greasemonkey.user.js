// ==UserScript==
// @name            MediaWiki Get Global Value Example
// @namespace       http://userstyles.org/users/12
// @description     Get variables from content window
// @require         https://github.com/LouCypher/userscripts/raw/master/getGlobalValue.js/getGlobalValue.js
// @include         http://*.wikia.com/*
// @include         http://*.wikipedia.org/*
// @include         https://*.wikipedia.org/*
// @include         http://wiki.greasespot.net/*
// ==/UserScript==

if (frameElement) return; // Don't run inside frame/iframe

var sitename = getGlobalValue("wgSiteName");
var username = getGlobalValue("wgUserName");
var usergroups = getGlobalValue("wgUserGroups");
var action = getGlobalValue("wgAction");  // viewing/editing/submitting
var title = getGlobalValue("wgTitle");
var msg = "Welcome to " + sitename
        + (username ? (", " + username) : "") + ".\n"
        + "You are " + action + "ing \"" + title + "\" article.\n"
        + "You're " + (usergroups ? ("a " + usergroups) : "not logged in")
        + ".";

console.log(msg);
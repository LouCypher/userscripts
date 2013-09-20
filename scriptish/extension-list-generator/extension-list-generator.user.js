/*
 *  This Source Code Form is subject to the terms of the Mozilla Public
 *  License, v. 2.0. If a copy of the MPL was not distributed with this
 *  file, you can obtain one at http://mozilla.org/MPL/2.0/.
 *
 */

// ==UserScript==
// @id              extension-list-generator@loucypher
// @name            Extension List Generator
// @description     Generate list of enabled extensions from Add-ons Manager to HTML, Markdown, BBCode or plain text output.
// @namespace       http://userscripts.org/users/12
// @version         2.2
// @author          LouCypher
// @license         MPL 2.0
// @screenshot      https://lh3.googleusercontent.com/-T1PPKIZoT1M/UW7tiMF0rWI/AAAAAAAADfY/XWzdfEDgtD4/s0/extension-list-generator.png
// @icon            https://addons.cdn.mozilla.net/media/img/addon-icons/default-32.png
// @icon64URL       https://addons.cdn.mozilla.net/media/img/addon-icons/default-64.png
// @contributionURL http://loucypher.github.io/userscripts/donate.html?Extensions+List+Generator
// @homepageURL     https://github.com/LouCypher/userscripts/tree/master/scriptish/extension-list-generator
// @supportURL      https://github.com/LouCypher/userscripts/issues
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/scriptish/extension-list-generator/extension-list-generator.user.js
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/scriptish/extension-list-generator/extension-list-generator.user.js
// @require         https://gist.github.com/LouCypher/ad4e4bc2762a0ef854ac/raw/bbcode.js
// @require         https://gist.github.com/LouCypher/ad4e4bc2762a0ef854ac/raw/markdown.js
// @resource        options https://raw.github.com/LouCypher/userscripts/master/scriptish/extension-list-generator/options.xul
// @resource        CHANGELOG https://raw.github.com/LouCypher/userscripts/master/scriptish/extension-list-generator/changelog.txt
// @resource        LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/MPL/LICENSE.txt
// @include         about:addons
// @include         chrome://mozapps/content/extensions/extensions.xul
// ==/UserScript==

var utilsMenu = document.getElementById("utils-menu");
utilsMenu.appendChild(document.createElement("menuseparator"));

var menu = utilsMenu.appendChild(document.createElement("menu"));
menu.setAttribute("label", "Generate extension list");

var menupopup = menu.appendChild(document.createElement("menupopup"));

["HTML", "Markdown", "BBCode", "Plain text"].forEach(function(format) {
  var menuitem = menupopup.appendChild(document.createElement("menuitem"));
  menuitem.setAttribute("label", format);
})

menupopup.appendChild(document.createElement("menuseparator"));

var optionsMenu = menupopup.appendChild(document.createElement("menuitem"));
optionsMenu.setAttribute("label", "Options");
optionsMenu.addEventListener("command", openOptions, false);

menupopup.addEventListener("command", generate, false);

var rptCurrentDate, rptAddonsURLs, rptAddonsDescs, rptThemeScreenshot,
    rptInsideSpoiler;

initPrefs();

function generate(aEvent) {
  if (aEvent.target.getAttribute("label") == "Options") return;
  initPrefs();
  AddonManager.getAddonsByTypes(["theme", "extension"], function(addons) {
    var theme;
    var extArray = [];
    addons.forEach(function(addon) {
      if (addon.isActive) {
        if (addon.type == "theme") theme = addon;
        else extArray.push(addon);
      }
    })
    extArray.sort(function(a, b) {
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    })
    var title = "My " + Application.name + " information";
    var date = new Date();
    switch (aEvent.target.getAttribute("label")) {
      case "HTML": generateHTML(title, date, theme, extArray); break;
      case "Markdown": generateMarkdown(title, date, theme, extArray); break;
      case "BBCode": generateBBCode(title, date, theme, extArray); break;
      case "Plain text": generateText(title, date, theme, extArray);
    }
  })
}

function generateHTML(aTitle, aDate, aTheme, aArray) {
  var extensions = '<!doctype html><html itemscope="itemscope"'
                 + ' itemtype="http://schema.org/WebPage"><head>'
                 + '<meta charset="utf-8"><meta itemprop="description"'
                 + ' content="' + aTitle + '"><meta name="description"'
                 + ' content="' + aTitle + '"><style type="text/css">'
                 + 'body{background:appworkspace}a:link{color:blue}a:visited{color:purple}'
                 + 'a:hover{background:yellow}#wrapper{background:white;color:black;width:'
                 + '960px;padding:1em 3em;margin:25px auto;border-radius:10px;box-shadow:'
                 + '3px 6px 9px rgba(0,0,0,.5);line-height:1.5em}.column{width:768px}li{'
                 + 'margin-bottom:1em}</style><title>' + aTitle + '</title>'
                 + '</head><body><div id="wrapper"><h1>' + aTitle + '</h1>'
                 + (rptCurrentDate ? "<p>Last updated: " + aDate + "</p>" : "")
                 + "<h2>User agent</h2><p>" + navigator.userAgent
                 + "</p><h2>Theme</h2><p>"
                 + (rptAddonsURLs && !isDefaultTheme(aTheme)
                    ? '<a href="' + getThemeURL(aTheme) + '">' + aTheme.name + '</a>'
                    : aTheme.name)
                 + "</p>"
                 + (rptThemeScreenshot && !isDefaultTheme(aTheme) &&
                    aTheme.screenshots && !/getpersonas/.test(aTheme.screenshots)
                    ? '<p><img src="' + aTheme.screenshots[0].url +
                      '" alt="' + aTheme.name + '"/></p>'
                    : "")
                 + "<h2>Extensions</h2>"
                 + '<ol class="column">';
  aArray.forEach(function(addon) {
    extensions += '<li>'
                + (rptAddonsURLs
                   ? ((addon.reviewURL
                      ? '<a href="' + getAMOPage(addon.reviewURL) + '">'
                      : addon.homepageURL
                        ? '<a href="' + addon.homepageURL + '">'
                        : '<a href="http://www.google.com/search?q="' +
                          encodeURIComponent(addon.name + " extension") +
                          '">')
                      + addon.name + '</a>')
                   : addon.name)
                + (addon.version ? " " + addon.version : "")
                + (rptAddonsDescs ? "<br/>" + addon.description : "")
                + "</li>";
  })
  extensions += "</ol></div></body></html>";
  doSomething(extensions, "html");
}

function generateMarkdown(aTitle, aDate, aTheme, aArray) {
  var idx = 0;
  var extensions = "# " + aTitle
                 + (rptCurrentDate ? "\n\nLast updated: " + aDate : "")
                 + "\n\n## User agent\n\n" + navigator.userAgent
                 + "\n\n## Theme\n\n"
                 + (rptAddonsURLs && !isDefaultTheme(aTheme)
                    ? "[" + aTheme.name + "](" + getThemeURL(aTheme) + ")"
                    : aTheme.name)
                 + (rptThemeScreenshot && !isDefaultTheme(aTheme) &&
                    aTheme.screenshots && !/getpersonas/.test(aTheme.screenshots)
                    ? "\n\n![" + aTheme.name + "](" + aTheme.screenshots[0].url + ")"
                    : "")
                 + "\n\n## Extensions";
  aArray.forEach(function(addon) {
    idx++;
    extensions += "\n\n" + idx + ". "
                + (rptAddonsURLs
                   ? ((addon.reviewURL
                      ? "[" + addon.name + "](" + getAMOPage(addon.reviewURL)
                      : addon.homepageURL
                        ? "[" + addon.name + "](" + addon.homepageURL
                        : "[" + addon.name + "](" +
                          "http://www.google.com/search?q=" +
                          encodeURIComponent(addon.name + " extension"))
                      + ")")
                   : addon.name)
                + (addon.version ? " " + addon.version : "")
                + (rptAddonsDescs ? "  \n" + addon.description : "")
  })
  doSomething(extensions, "markdown");
}

function generateBBCode(aTitle, aDate, aTheme, aArray) {
  var extensions = (rptInsideSpoiler ? "[spoiler=" + aTitle + "]" : "")
                 + (rptCurrentDate ? "[b]Last updated: [/b]" + aDate : "")
                 + "\n\n[b]User agent:[/b] " + navigator.userAgent
                 + "\n\n[b]Theme:[/b] "
                 + (rptAddonsURLs && !isDefaultTheme(aTheme)
                    ? "[url=" + getThemeURL(aTheme) + "]" + aTheme.name + "[/url]"
                    : aTheme.name)
                 + (rptThemeScreenshot && !isDefaultTheme(aTheme) &&
                    aTheme.screenshots && !/getpersonas/.test(aTheme.screenshots)
                    ? "\n[img]" + aTheme.screenshots[0].url + "[/img]"
                    : "")
                 + "\n\n[b]Extensions:[/b]\n[list=1]"
  aArray.forEach(function(addon) {
    extensions += "[*]"
                + (rptAddonsURLs
                   ? ((addon.reviewURL
                       ? "[url=" + getAMOPage(addon.reviewURL)
                       : addon.homepageURL
                         ? "[url=" + addon.homepageURL
                         : "[url=http://www.google.com/search?q=" +
                           encodeURIComponent(addon.name + " extension"))
                       + "]" + addon.name + "[/url]")
                   : addon.name)
                + (addon.version ? " " + addon.version : "")
                + (rptAddonsDescs ? "\n" + addon.description : "");
  })
  extensions += rptInsideSpoiler ? "[/list][/spoiler]" : "[/list]";
  doSomething(extensions, "bbcode");
}

function generateText(aTitle, aDate, aTheme, aArray) {
  var idx = 0;
  var extensions = aTitle + "\n"
  for (var i = 0; i < aTitle.length; i++) {
    extensions += "=";
  }
  extensions += (rptCurrentDate ? "\n\nLast updated: " + aDate : "")
              + "\n\nUser agent: " + navigator.userAgent
              + "\n\nTheme: " + aTheme.name + "\n\nExtensions\n----------";
  aArray.forEach(function(addon) {
    idx++;
    extensions += "\n" + idx + ". " + addon.name
                + (addon.version ? " " + addon.version : "")
                + (rptAddonsDescs ? "\n" + addon.description : "")
                + (rptAddonsURLs
                   ? "\n" + (addon.reviewURL ? getAMOPage(addon.reviewURL)
                                             : addon.homepageURL
                                               ? addon.homepageURL
                                               : "")
                   : "")
                + (rptAddonsDescs || rptAddonsURLs ? "\n" : "");
  })
  doSomething(extensions, "text");
}

function doSomething(aString, aFormat) {
  var prompts = Services.prompt;
  var flags = prompts.BUTTON_POS_0 * prompts.BUTTON_TITLE_IS_STRING +
              prompts.BUTTON_POS_1 * prompts.BUTTON_TITLE_CANCEL +
              prompts.BUTTON_POS_2 * prompts.BUTTON_TITLE_IS_STRING;
  var doWhat = prompts.confirmEx(null, "Extension List Generator",
                                 "Extension list has been generated.", flags,
                                 "Copy", "", "View", null, {value:false});
  switch (doWhat) {
    case 0: // Copy
      Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper)
                                                 .copyString(aString);
      Cc["@mozilla.org/alerts-service;1"].getService(Ci.nsIAlertsService).
      showAlertNotification("chrome://mozapps/skin/xpinstall/xpinstallItemGeneric.png",
                            "Extension List Generator", "Copied to clipboard!",
                            false, "", null);
      break;
    case 2: // View
      var contentType;
      switch(aFormat) {
        case "html": contentType = "text/html"; break;
        case "markdown":
          contentType = "text/html";
          marked.setOptions({
            gfm: true,
            tables: true,
            breaks: false,
            pedantic: false,
            sanitize: true,
            smartLists: true
          })
          aString = marked(aString);
          break;
        case "bbcode":
          contentType = "text/html";
          var output = XBBCODE.process({
            text: aString,
            removeMisalignedTags: false,
            addInLineBreaks: true
          })
          aString = output.html;
          break;
        default: contentType = "text/plain";
      }
      openOptionsInTab("data:" + contentType + ";charset=utf-8," +
                       encodeURIComponent(aString));
    default: // Cancel
  }
}

function isDefaultTheme(aTheme) {
  return aTheme.id == "{972ce4c6-7e08-4474-a285-3208198ce6fd}" ||
         aTheme.id == "modern@themes.mozilla.org";
}

function getAMOPage(aReviewURL) {
  var url = aReviewURL.replace(/\/reviews\/.*$/, "/")
                      .replace(/mozilla.org\/.*\/addon\//, "mozilla.org/addon/");
  url += "?src=external-extension-list-generator";
  return url;
}

function getThemeURL(aAddon) {
  var url;
  if (aAddon.reviewURL) {
    return getAMOPage(aAddon.reviewURL);
  } else {
    var id = aAddon.id.match(/\d+/).toString();
    if (/getpersonas/.test(aAddon.screenshots[0].url)) {
      url = "http://getpersonas.com/persona/" + id;
    } else {
      url = "http://addons.mozilla.org/addon/" + id;
    }
  }
  url += "/?src=external-extension-list-generator";
  return url;
}

function getBoolPref(aPrefName, aDefVal) {
  var prefRoot = "extensions.scriptish.scriptvals.extension-list-generator@loucypher.report.";
  var prefBranch = Services.prefs.getBranch(prefRoot);
  try {
    return prefBranch.getBoolPref(aPrefName);
  } catch(ex) {
    prefBranch.setBoolPref(aPrefName, aDefVal);
    return aDefVal;
  }
}

function initPrefs() {
  rptCurrentDate = getBoolPref("currentDate", true);
  rptAddonsURLs = getBoolPref("addonsURLs", true);
  rptAddonsDescs = getBoolPref("addonsDescriptions", false);
  rptThemeScreenshot = getBoolPref("themeScreenshot", true);
  rptInsideSpoiler = getBoolPref("insideSpoiler", false);
}

function openOptions() {
  var em = Services.ww.getWindowEnumerator();
  var winName = "extension-list-generator-options";
  var index = 1;
  while (em.hasMoreElements()) {
    let win = em.getNext();
    if(win.name == winName) {
      win.focus();
      return;
    }
    index++
  }
  openDialog(GM_getResourceURL("options"), winName,
             "chrome, dialog, centerscreen, close");
}

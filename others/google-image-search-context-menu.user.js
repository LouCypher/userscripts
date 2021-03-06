/*
    Search by Image Context Menu
    Add menu in browser context menu when you right click on
    an image to search that image on search engines.
    Copyright (C) 2012 LouCypher

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <http://www.gnu.org/licenses/>
*/

// ==UserScript==
// @name            Search by Image Context Menu
// @namespace       http://userscripts.org/users/12
// @description     Add menu in browser context menu when you right click on an image to search that image on search engines.
// @version         2.2
// @author          LouCypher
// @license         GPL
// @resource        license https://raw.github.com/LouCypher/userscripts/master/licenses/GPL/LICENSE.txt
// @include         *
// @exclude         file://*
// @grant           GM_openInTab
// @grant           GM.openInTab
// ==/UserScript==

function initMenu(aEvent) {
// Executed when user right click on web page body
// aEvent.target is the element you right click on
  let item = document.querySelector("#userscript-search-by-image");
  if (aEvent.target.localName == "img") {
    body.setAttribute("contextmenu", "userscript-search-by-image");
    item.setAttribute("imageURL", aEvent.target.src);
  } else {
    body.removeAttribute("contextmenu");
    item.removeAttribute("imageURL");
  }
}

function addParamsToForm(aForm, aKey, aValue) {
  let hiddenField = document.createElement("input");
  hiddenField.setAttribute("type", "hidden");
  hiddenField.setAttribute("name", aKey);
  hiddenField.setAttribute("value", aValue);
  aForm.appendChild(hiddenField);
}

// Executed when user click on menuitem
// aEvent.target is the <menu> element
function searchImage(aEvent) {
  let imageURL = document.querySelector("#userscript-search-by-image").getAttribute("imageURL");
  console.log(aEvent.target);
  if (imageURL.indexOf("data:") == 0) {
    let base64Offset = imageURL.indexOf(",");
    if (base64Offset != -1) {
      let inlineImage = imageURL.substring(base64Offset + 1)
                                .replace(/\+/g, "-")
                                .replace(/\//g, "_")
                                .replace(/\./g, "=");

      let form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", "//www.google.com/searchbyimage/upload");
      form.setAttribute("enctype", "multipart/form-data");
      form.setAttribute("target", "_blank");
      addParamsToForm(form, "image_content", inlineImage);
      addParamsToForm(form, "filename", "");
      addParamsToForm(form, "image_url", "");
      body.appendChild(form);
      form.submit();
    }
  } else {
    let url = aEvent.target.getAttribute("url") +
              (aEvent.target.hasAttribute("noescape")
              ? imageURL : encodeURIComponent(imageURL));
    if (typeof GM_openInTab == "function") {
      GM_openInTab(url, false);
    } else if (typeof GM.openInTab == "function") {
      GM.openInTab(url, false);
    } else {
      open(url);
    }
  }
}

if (!("contextMenu" in document.documentElement &&
      "HTMLMenuItemElement" in window)) return;

var body = document.body;
body.addEventListener("contextmenu", initMenu, false);

var services = [
  {
    "name": "Google",
    "host": "https://www.google.com/",
    "query": "searchbyimage?image_url="
  }, {
    "name": "Bing",
    "host": "https://www.bing.com/",
    "query": "images/search?view=detailv2&iss=sbi&q=imgurl:"
  }, {
    "name": "Yandex",
    "host": "https://yandex.com/",
    "query": "images/search?rpt=imageview&url="
  }, {
    "name": "Baidu",
    "host": "https://graph.baidu.com/",
    "query": "details?carousel=0&image="
  }, {
    "name": "TinEye",
    "host": "https://tineye.com/",
    "query": "search?sort=size&order=desc&url="
  }, {
    "name": "SauceNAO",
    "host": "https://saucenao.com/",
    "query": "search.php?url="
  }, {
    "name": "IQDB",
    "host": "https://iqdb.org/",
    "query": "?url="
  }, {
    "name": "Karma Decay",
    "host": "http://karmadecay.com/",
    "query": "search?q="
  }, {
    "name": "ImgOps",
    "host": "http://imgops.com/",
    "query": ""
  }
];

var menucontainer = body.appendChild(document.createElement("menu"));
menucontainer.setAttribute("id", "userscript-search-by-image");
menucontainer.setAttribute("type", "context");

var menu = menucontainer.appendChild(document.createElement("menu"));
menu.setAttribute("label", "Search Image via\u2026");

for (let i in services) {
  let menuitem = menu.appendChild(document.createElement("menuitem"));
  menuitem.setAttribute("label", services[i].name);
  menuitem.setAttribute("icon", services[i].host + "favicon.ico");
  menuitem.setAttribute("url", services[i].host + services[i].query);
  if (services[i].query == "")
    menuitem.setAttribute("noescape", "");
}

document.querySelector("#userscript-search-by-image>menu")
        .addEventListener("click", searchImage, false);

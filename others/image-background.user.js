// ==UserScript==
// @name          Image Background
// @namespace     http://userscripts.org/users/12
// @description   Change image background
// @version       2.0
// @author        LouCypher
// @run-at        document-start
// @include       *
// @grant         GM_addStyle
// ==/UserScript==

if ("loading" != document.readyState) {
  throw new Error("This userscript only works with "
                + "Greasemonkey 0.9.8 or newer.");
}

if (!/^image\//.test(document.contentType)) return;

GM_addStyle('html, body {\n\
  background: transparent url("data:image/gif;base64,\\\n\
R0lGODlhEAAQAIAAAPDz+P///ywAAAAAEAAQAAACH4RvoauIzNyBSyYaLMDZcv15HAaS\\\n\
IlWiJ5Sya/RWVgEAOw==") 0 0 repeat !important;\n\
}\n\n\
img {\n\
  background: transparent none !important;\n\
  box-shadow: 0px 0px 9px rgba(0, 0, 0, .5) !important;\n\
}')
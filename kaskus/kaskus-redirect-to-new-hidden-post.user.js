// ==UserScript==
// @name            Kaskus - Redirect to new hidden post
// @namespace       http://userscripts.org/users/12
// @include         http://www.kaskus.co.id/post/*#post*
// @version         1.0
// @grant           none
// ==/UserScript==

if (sessionStorage.getItem("seen")) {
  sessionStorage.removeItem("seen");
} else {
  if (!document.querySelector(location.hash)) {
    sessionStorage.setItem("seen", true);
    location.replace(location.href.replace(/\#.*/, "")
                                  .replace(/\/post\//, "/show_post/"))
  }
}
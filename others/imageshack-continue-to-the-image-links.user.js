// ==UserScript==
// @name            ImageShack - Continue to the image links
// @namespace       http://userscripts.org/users/12
// @description     Continue to the image links after uploading
// @version         0.1
// @license         public domain
// @downloadURL     https://raw.github.com/LouCypher/userscripts/master/others/imageshack-continue-to-the-image-links.user.js
// @updateURL       https://raw.github.com/LouCypher/userscripts/master/others/imageshack-continue-to-the-image-links.user.js
// @include         /^http://imageshack\.us/content_round\.php\?.*page=done.*/
// @run-at          document-start
// @grant           none
// ==/UserScript==

if (!/\&sa\=0$/.test(location.search))
  location.replace(location.href + "&sa=0");

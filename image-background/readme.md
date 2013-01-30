# Standalone Image Background and Transparency

[![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?url=https%3A%2F%2Fgithub.com%2FLouCypher%2Fuserscripts)
[![Tweet](https://si0.twimg.com/a/1309282244/images/goodies/tweetn.png)](https://twitter.com/share?text=Change+standalone+image+background+and+show+transparency+on+%23Firefox+with+this+%23userscript&url=https%3A%2F%2Fgithub.com%2FLouCypher%2Fuserscripts%2Ftree%2Fmaster%2Fimage-background&related=zoolcar9&via=zoolcar9)

Change standalone image background and show transparency on Firefox.
Use context menu to configure it.

## Compatibility

### Browsers
* Firefox 15+
* Pale Moon 15+
* SeaMonkey 2.12+

### Extensions

* [Greasemonkey](https://addons.mozilla.org/addon/greasemonkey?src=external-github.com/loucypher/userscripts) 0.9.16+
* [Scriptish](https://addons.mozilla.org/addon/scriptish?src=external-github.com/loucypher/userscripts) 0.1+

## Installation

* [Kinda stable release](https://userscripts.org/scripts/source/153158.user.js "via Userscripts.org")
* [Development build](https://raw.github.com/LouCypher/userscripts/master/image-background/image-background.user.js "via GitHub.com")

## Screenshots

[![Before](https://lh4.googleusercontent.com/-Pay5iiGHq0Q/ULZsaTrwlRI/AAAAAAAAC5U/ND8sMF1-XZg/s320/image-before.png "Before")](https://lh4.googleusercontent.com/-Pay5iiGHq0Q/ULZsaTrwlRI/AAAAAAAAC5U/ND8sMF1-XZg/s0/image-before.png)
[![After](https://lh4.googleusercontent.com/-9mHK9gjsEd8/ULienLrrojI/AAAAAAAAC6Y/CoJitWWXsHc/s320/image-after.png "After")](https://lh4.googleusercontent.com/-9mHK9gjsEd8/ULienLrrojI/AAAAAAAAC6Y/CoJitWWXsHc/s0/image-after.png)

## Configurations

To change image background settings, right click on the page.

![Firefox context menu](https://lh3.googleusercontent.com/-B-l3fYMSfac/UL-gXOA3ufI/AAAAAAAAC8I/-BfWxawoW_A/s0/image-after-contextmenu.png "Firefox context menu")

### Change background color

To change background color, select **Change Background Color** on
context menu to open color setting dialog.

![Color setting dialog with color picker](https://lh6.googleusercontent.com/-m2GcHYlhFUU/UNa2QB4HR3I/AAAAAAAADAg/cr2JhBMDkVk/s0/image-jscolor-1.png "Color setting dialog with color picker")

Please note that the color picker requires JavaScript to be enabled.
However, you can still change background color by entering any valid
[color value](https://developer.mozilla.org/CSS/color_value).

If you have [NoScript](https://addons.mozilla.org/addon/noscript?src=external-github.com/loucypher/userscripts) extension, color picker will work if you allow the site from NoScript menu.

![Color setting dialog without color picker](https://lh3.googleusercontent.com/-xAok34tasEg/UNa2LMCQGSI/AAAAAAAADAY/fLjkZW9_rAc/s0/image-jscolor-2.png "Color setting dialog without color picker")

### Toggle background patterns

To toggle background patterns, check/uncheck **Use Background Patterns** on context menu.

### Toggle image transparency

To toggle image transparency, check/uncheck **Show Image Transparency** on context menu.

## Limitations

### URL schemes

By default, this script will not run on image on local disk. To enable it:

* Greasemonkey:
  1. Type `about:config?filter=fileIsGreaseable` in Location Bar and press Enter.
  2. Change **extensions.greasemonkey.fileIsGreaseable** value to **true**.
* Scriptish:
  1. Open Scriptish options.
  2. On Sciptish options dialog, select [**Advanced**](http://scriptish.org/screenshots/pref-advanced.png) tab.
  3. Turn on **file protocol** in **Additional protocols** option.

The script will not run on **about:** and **chrome:** schemes (e.g. `about:logo`, `chrome://greasemonkey/skin/icon32.png`) with Greasemonkey (see [Greaseable schemes](http://wiki.greasespot.net/Include_and_exclude_rules#Greaseable_schemes)). But with Scriptish, you can enable it by repeating step 1 and 2 above, then turn on **about protocol** and **chrome protocol** in **Additional protocols** option.

### SVG images

SVG images works with Greasemonkey but not with Scriptish. Context menu to configure background color, however, doesn't work on SVG images.
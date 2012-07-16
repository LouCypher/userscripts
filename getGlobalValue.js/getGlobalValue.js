//@https://github.com/LouCypher/userscripts/tree/master/getGlobalValue.js
/*
    Get value a global variable from user script. Version 1.3
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

/**
 * Get the value of a global variable.
 *
 * @param aGlobalVarName
 *        String. The name of global variable.
 *        To get property of a global object, use "object['property']"
 *        or "object['property1']['property2']".
 * @param debug [optional]
 *        Boolean. If true, display 'variable = value' in console.
 * @returns The value of aGlobalVarName.
 *          If aGlobalVarName is undefined, returns null.
 */
function getGlobalValue(aGlobalVarName, debug) {
  var script = document.querySelector("head")
                       .appendChild(document.createElement("script"));
  script.type = "text/javascript";

  // Unique name for sessionStorage
  var itemName = "globalValue_" + (new Date()).getTime().toString();

  // Store global value to sessionStorage
  script.textContent = "sessionStorage['" + itemName + "'] = " +
                       "JSON.stringify({'value' : " + aGlobalVarName + "})";

  var globalValue;
  try {
    // Get global value from sessionStorage
    globalValue = JSON.parse(sessionStorage[itemName]).value;
  } catch (ex) {}

  // Clean up
  script.parentNode.removeChild(script); // Remove <script> from DOM
  sessionStorage.removeItem(itemName); // Remove sessionStorage item

  debug && console.log(aGlobalVarName + " = " + globalValue);

  return globalValue; // Returns the value of aGlobalVarName
                      // Returns null if aGlobalVarName is undefined
}
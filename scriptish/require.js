function adddiv(callback, css) {
  var div = document.body.appendChild(document.createElement("div"));
  div.id = "added-by-userscript";
  callback(css)
}
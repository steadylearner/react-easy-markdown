"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = html;
exports.copy = copy;
exports.substitutePrefixes = substitutePrefixes;

var _marked = require("marked");

function substitutePrefixes() {
  var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://www.steadylearner.com";
  var prefixesWithReplacements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["s-", "https://"]];
  var isHrefeIncludeAnyPrefix = prefixesWithReplacements.filter(function (x) {
    return href.startsWith(x[0]);
  });

  if (isHrefeIncludeAnyPrefix.length === 1) {
    // === i instead of > 0 to be more precise
    return "".concat(isHrefeIncludeAnyPrefix[0][1]).concat(href.split(isHrefeIncludeAnyPrefix[0][0])[1]);
  } else {
    return href;
  }
}

function html() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var test = (0, _marked.parser)((0, _marked.lexer)(input));
  return test;
}

function copy() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  // copyToClipboardWithCode
  var textField = document.createElement("textarea");
  var brRegex = /<br\s*[\/]?>/gi;
  var leftHTMLrapperRegex = /&lt;/g;
  var rightHTMLWrapperRegex = /&gt;/g; // 1.

  textField.innerText = value; // 2.

  document.body.appendChild(textField); // 3.

  textField.value = textField.innerHTML.replace(brRegex, "\r\n").replace(leftHTMLrapperRegex, "<").replace(rightHTMLWrapperRegex, ">"); // 4.

  textField.select(); // select copies html value

  document.execCommand("copy");
  textField.remove();
}
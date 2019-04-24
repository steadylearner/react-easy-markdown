"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = html;
exports.markdown = markdown;
exports.copy = copy;
exports.substitutePrefixes = substitutePrefixes;
exports.readLocalFileWithHow = readLocalFileWithHow;
exports.saveTextFromWeb = saveTextFromWeb;

var _marked = require("marked");

var _showdown = _interopRequireDefault(require("showdown"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function markdown() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var converter = new _showdown.default.Converter();
  var result = converter.makeMarkdown(input);
  return result;
}

function substitutePrefixes() {
  var href = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "https://www.steadylearner.com";
  var prefixesWithReplacements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [["s-", "https://"]];
  var isHrefIncludeAnyPrefix = prefixesWithReplacements.filter(function (x) {
    return href.startsWith(x[0]);
  });

  if (isHrefIncludeAnyPrefix.length === 1) {
    // === i instead of > 0 to be more precise
    return "".concat(isHrefIncludeAnyPrefix[0][1]).concat(href.split(isHrefIncludeAnyPrefix[0][0])[1]);
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
  var brRegex = /<br\s*?>/gi; // const brRegex = /<br\s*[\/]?>/gi;

  var leftHTMLrapperRegex = /&lt;/g;
  var rightHTMLWrapperRegex = /&gt;/g; // 1.

  textField.innerText = value; // 2.

  document.body.appendChild(textField); // 3.

  textField.value = textField.innerHTML.replace(brRegex, "\r\n").replace(leftHTMLrapperRegex, "<").replace(rightHTMLWrapperRegex, ">"); // 4.

  textField.select(); // select copies html value

  document.execCommand("copy");
  textField.remove();
} // Use your own function to what to do with the contents of local file


function readLocalFileWithHow() {
  var e = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // (How -> How to use it)
  var file = e.target.files[0];

  if (!file) {
    return;
  }

  if (fn === {}) {
    return;
  }

  var reader = new FileReader();

  reader.onload = function (e) {
    var contents = e.target.result;
    fn(contents);
  };

  reader.readAsText(file);
} // inside class
// readLocalFile(e) {
//     let file = e.target.files[0];
//     if (!file) {
//         return;
//     }
//     let reader = new FileReader();
//     reader.onload = (e) => {
//         let contents = e.target.result;
//         this.setState({
//             value: contents,
//         });
//     };
//     reader.readAsText(file);
// }
// Pass text value to save file and name if you want. 
// For example, saveTextFromWeb("This is from your markdown editor.", "README.md")


function saveTextFromWeb() {
  var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "post.md";
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "text/plain";
  var textToBlob = new Blob([text], {
    type: type
  });
  var blobURL = window.URL.createObjectURL(textToBlob);
  var fileName = name;
  var fileLink = document.createElement("a");
  fileLink.download = fileName;
  fileLink.innerHTML = "Save File from Web";
  fileLink.href = blobURL;
  fileLink.onclick = destroyClickedElement;
  fileLink.style.display = "none";
  document.body.appendChild(fileLink);
  fileLink.click();
}

function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}
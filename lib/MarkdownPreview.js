"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _marked = _interopRequireDefault(require("marked"));

var _highlight = _interopRequireDefault(require("highlight.js"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _jsdom = require("jsdom");

var _api = require("./api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Initializing DOM Purify
var window = new _jsdom.JSDOM("").window;
var DOMPurify = (0, _dompurify.default)(window);

function MarkdownPreview(_ref) {
  var markedOptions = _ref.markedOptions,
      value = _ref.value,
      className = _ref.className,
      prefixWithReplacement = _ref.prefixWithReplacement,
      titleMessage = _ref.titleMessage;
  var options = {};

  if (markedOptions) {
    options = markedOptions;
    options = _objectSpread({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      langPrefix: "hljs "
    }, options);

    if (typeof _highlight.default !== "undefined") {
      options = _objectSpread({}, options, {
        highlight: function highlight(code, lang) {
          if (!!(lang && _highlight.default.getLanguage(lang))) {
            return _highlight.default.highlight(lang, code).value;
          }

          return code;
        }
      });
    }

    _marked.default.setOptions(options);
  }

  var renderer = new _marked.default.Renderer(); // Remove null title problem when it is undefined by giving default value
  // and you can define shortcuts for <a> in markdown

  renderer.link = function (href, title, text) {
    var lastHref = (0, _api.substitutePrefixes)(href, prefixWithReplacement);
    return "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"".concat(lastHref, "\" title=\"").concat(title === null ? "".concat(titleMessage, " ").concat(lastHref) : title, "\" >").concat(text, "</a>");
  };

  var html = DOMPurify.sanitize((0, _marked.default)(value || "", {
    renderer: renderer
  }));
  return _react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: html
    },
    className: className
  });
}

MarkdownPreview.propTypes = {
  value: _propTypes.default.string,
  className: _propTypes.default.string,
  markedOptions: _propTypes.default.object,
  prefixWithReplacement: _propTypes.default.array,
  titleMessage: _propTypes.default.string
};
MarkdownPreview.defaultProps = {
  value: "",
  // "**This is default value. Write Your own markdown**",
  prefixWithReplacement: [["s-", "https://"]],
  titleMessage: "Click it will open a new tab at"
};
var _default = MarkdownPreview;
exports.default = _default;
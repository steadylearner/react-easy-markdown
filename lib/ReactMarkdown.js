"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _marked = _interopRequireDefault(require("marked"));

var _highlight = _interopRequireDefault(require("highlight.js"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dompurify = _interopRequireDefault(require("dompurify"));

var _jsdom = require("jsdom");

// Initializing DOM Purify
var window = new _jsdom.JSDOM("").window;
var DOMPurify = (0, _dompurify["default"])(window);

function ReactMarkdown(_ref) {
  var value = _ref.value,
      className = _ref.className,
      markedOptions = _ref.markedOptions,
      prefixWithReplacement = _ref.prefixWithReplacement,
      titleMessage = _ref.titleMessage;
  var options = {};

  if (markedOptions) {
    options = markedOptions;
  }

  options = (0, _objectSpread2["default"])({
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false,
    langPrefix: "hljs "
  }, options);

  if (typeof _highlight["default"] !== "undefined") {
    options = (0, _objectSpread2["default"])({}, options, {
      highlight: function highlight(code, lang) {
        if (!!(lang && _highlight["default"].getLanguage(lang))) {
          return _highlight["default"].highlight(lang, code).value;
        }

        return code;
      }
    });
  }

  _marked["default"].setOptions(options);

  var renderer = new _marked["default"].Renderer();

  renderer.link = function (href, title, text) {
    var isHrefeIncludeAnyPrefix = prefixWithReplacement.filter(function (x) {
      return href.startsWith(x[0]);
    });

    if (isHrefeIncludeAnyPrefix.length === 1) {
      // === i instead of > 0 to be more precise
      var hrefReplacedByPrefix = "".concat(isHrefeIncludeAnyPrefix[0][1]).concat(href.split(isHrefeIncludeAnyPrefix[0][0])[1]);
      return "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"".concat(hrefReplacedByPrefix, "\" title=\"").concat(title === null ? "".concat(titleMessage, " ").concat(hrefReplacedByPrefix) : title, "\" >").concat(text, "</a>");
    } else {
      return "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"".concat(href, "\" title=\"").concat(title === null ? "".concat(titleMessage, " ").concat(href) : title, "\" >").concat(text, "</a>");
    }
  };

  var html = DOMPurify.sanitize((0, _marked["default"])(value || "", {
    renderer: renderer
  }));
  return _react["default"].createElement("div", {
    dangerouslySetInnerHTML: {
      __html: html
    },
    className: className
  });
}

ReactMarkdown.propTypes = {
  value: _propTypes["default"].string,
  className: _propTypes["default"].string,
  markedOptions: _propTypes["default"].object,
  prefixWithReplacement: _propTypes["default"].arrayOf.arrays,
  titleMessage: _propTypes["default"].string
};
ReactMarkdown.defaultProps = {
  value: "**This is default value. Write Your own markdown**",
  prefixWithReplacement: [["s-", "https://"]],
  titleMessage: "Click it will open a new tab at"
};
var _default = ReactMarkdown;
exports["default"] = _default;
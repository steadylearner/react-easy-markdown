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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// Initializing DOM Purify
var window = new _jsdom.JSDOM("").window;
var DOMPurify = (0, _dompurify.default)(window);

var MarkdownPreview =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MarkdownPreview, _React$Component);

  function MarkdownPreview(props) {
    var _this;

    _classCallCheck(this, MarkdownPreview);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MarkdownPreview).call(this, props));
    var options = {};

    if (_this.props.markedOptions) {
      options = _this.props.markedOptions;
    }

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

    return _this;
  }

  _createClass(MarkdownPreview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          value = _this$props.value,
          className = _this$props.className,
          prefixWithReplacement = _this$props.prefixWithReplacement,
          titleMessage = _this$props.titleMessage;
      var renderer = new _marked.default.Renderer(); // Remove null title problem when it is undefined by giving default value
      // and you can define shortcuts for <a> in markdown

      renderer.link = function (href, title, text) {
        var lastHref = (0, _api.substitutePrefixes)(href, prefixWithReplacement);
        return "<a target=\"_blank\" rel=\"noopener noreferrer\" href=\"".concat(lastHref, "\" title=\"").concat(title === null ? "".concat(titleMessage, " ").concat(lastHref) : title, "\" >").concat(text, "</a>");
      }; //     renderer.link = (href, title, text) => {
      //   const isHrefeIncludeAnyPrefix = prefixWithReplacement.filter(x =>
      //     href.startsWith(x[0])
      //   );
      //   if (isHrefeIncludeAnyPrefix.length === 1) {
      //     // === i instead of > 0 to be more precise
      //     const hrefReplacedByPrefix = `${isHrefeIncludeAnyPrefix[0][1]}${
      //       href.split(isHrefeIncludeAnyPrefix[0][0])[1]
      //     }`;
      //     return `<a target="_blank" rel="noopener noreferrer" href="${hrefReplacedByPrefix}" title="${
      //       title === null ? `${titleMessage} ${hrefReplacedByPrefix}` : title
      //     }" >${text}</a>`;
      //   } else {
      //     return `<a target="_blank" rel="noopener noreferrer" href="${href}" title="${
      //       title === null ? `${titleMessage} ${href}` : title
      //     }" >${text}</a>`;
      //   }
      // };


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
  }]);

  return MarkdownPreview;
}(_react.default.Component);

exports.default = MarkdownPreview;
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
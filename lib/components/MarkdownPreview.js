'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dompurify = require('dompurify');

var _dompurify2 = _interopRequireDefault(_dompurify);

var _jsdom = require('jsdom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initializing DOM Purify
var window = new _jsdom.JSDOM('').window;
var DOMPurify = (0, _dompurify2.default)(window);

var MarkdownPreview = function (_React$Component) {
  (0, _inherits3.default)(MarkdownPreview, _React$Component);

  function MarkdownPreview(props) {
    (0, _classCallCheck3.default)(this, MarkdownPreview);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MarkdownPreview.__proto__ || (0, _getPrototypeOf2.default)(MarkdownPreview)).call(this, props));

    var options = {};
    if (_this.props.markedOptions) {
      options = _this.props.markedOptions;
    }

    options = (0, _extends3.default)({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      langPrefix: 'hljs '
    }, options);

    if (typeof _highlight2.default !== 'undefined') {
      options = (0, _extends3.default)({}, options, {
        highlight: function highlight(code, lang) {
          if (!!(lang && _highlight2.default.getLanguage(lang))) {
            return _highlight2.default.highlight(lang, code).value;
          }

          return code;
        }
      });
    }

    _marked2.default.setOptions(options);
    return _this;
  }

  (0, _createClass3.default)(MarkdownPreview, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          value = _props.value,
          className = _props.className,
          prefixWithReplacement = _props.prefixWithReplacement,
          titleMessage = _props.titleMessage;


      var renderer = new _marked2.default.Renderer();
      // Remove null title problem and you can define shortcuts for <a> in markdown
      renderer.link = function (href, title, text) {

        var isHrefeIncludeAnyPrefix = prefixWithReplacement.filter(function (x) {
          return href.startsWith(x[0]);
        });

        if (isHrefeIncludeAnyPrefix.length === 1) {
          // === i instead of > 0 to be more precise
          var hrefReplacedByPrefix = '' + isHrefeIncludeAnyPrefix[0][1] + href.split(isHrefeIncludeAnyPrefix[0][0])[1];
          return '<a target="_blank" rel="noopener noreferrer" href="' + hrefReplacedByPrefix + '" title="' + (title === null ? titleMessage + ' ' + hrefReplacedByPrefix : title) + '" >' + text + '</a>';
        } else {
          return '<a target="_blank" rel="noopener noreferrer" href="' + href + '" title="' + (title === null ? titleMessage + ' ' + href : title) + '" >' + text + '</a>';
        }
      };

      var html = DOMPurify.sanitize((0, _marked2.default)(value || '', { renderer: renderer }));

      return _react2.default.createElement('div', {
        dangerouslySetInnerHTML: { __html: html },
        className: className
      });
    }
  }]);
  return MarkdownPreview;
}(_react2.default.Component);

exports.default = MarkdownPreview;


MarkdownPreview.propTypes = {
  value: _propTypes2.default.string,
  className: _propTypes2.default.string,
  markedOptions: _propTypes2.default.object,
  prefixWithReplacement: _propTypes2.default.arrayOf.arrays,
  titleMessage: _propTypes2.default.string
};

MarkdownPreview.defaultProps = {
  value: "**This is default value. Write Your own markdown**",
  prefixWithReplacement: [["s-", "https://"]],
  titleMessage: "Click it will open a new tab at"
};
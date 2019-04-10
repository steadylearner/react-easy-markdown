"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MarkdownInput(_ref) {
  var onChange = _ref.onChange,
      value = _ref.value,
      className = _ref.className,
      placeholder = _ref.placeholder,
      onChangeCapture = _ref.onChangeCapture;
  return _react.default.createElement("textarea", {
    onChange: onChange,
    value: value,
    className: className,
    placeholder: placeholder
  });
}

MarkdownInput.propTypes = {
  onChange: _propTypes.default.func,
  value: _propTypes.default.string,
  className: _propTypes.default.string,
  placeholder: _propTypes.default.string
};
var _default = MarkdownInput;
exports.default = _default;
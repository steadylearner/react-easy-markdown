import React from 'react';
import PropTypes from 'prop-types';

export default class MarkdownInput extends React.Component {
  render() {
    const { onChange, value, placeholder, className } = this.props;
    return (
      <textarea
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        ref="textareaRef"
        className={className}
      />
    );
  }
}

MarkdownInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

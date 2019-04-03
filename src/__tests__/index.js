import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { MarkdownPreview } from '../index';

const { describe, it } = global;

describe('MarkdownPreview', () => {
  it('should display markdown', () => {
    const text = '# Title';
    /* eslint-disable react/jsx-filename-extension */
    const wrapper = shallow(<MarkdownPreview value={text} />);
    expect(wrapper.html()).to.be.equal('<div><h1>Title</h1>\n</div>');
  });

  it('should sanitize the HTML', () => {
    const xss = '[XSS](javascript: alert`1`)';
    /* eslint-disable react/jsx-filename-extension */
    const wrapper = shallow(<MarkdownPreview value={xss} />);
    expect(wrapper.html())
      .to.be.equal('<div><p><a title="null" rel="noopener noreferrer">XSS</a></p>\n</div>');
  });
});

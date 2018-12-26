import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';


export default class SlackTabHeader extends Component {
  componentWillMount() {
  }

  render() {
    const { type, query } = this.props;
    return (
      <ReactMarkdown className="slack__tab-header" source={`${type} matching “${query}” **tab** or **↑** **↓** to navigate **↵** to select **esc** to dismiss`} />
    );
  }
}

SlackTabHeader.defaultProps = {
  type: 'People',
  query: '@'
};

SlackTabHeader.propTypes = {
  type: PropTypes.string,
  query: PropTypes.string
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlackTabHeader from './slack-tab-header';


export default class SlackTab extends Component {
  componentWillMount() {
  }

  render() {
    const { header, className, children } = this.props;
    return (
      <div className={`slack__tab ${className}`}>
        {header && <SlackTabHeader />}
        <div className="slack__tab-list">
          { children }
        </div>
      </div>
    );
  }
}

SlackTab.defaultProps = {
  header: true,
  className: '',
  children: null
};

SlackTab.propTypes = {
  header: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
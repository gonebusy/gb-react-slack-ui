import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlackTabHeader from './SlackTabHeader';


export default class SlackTab extends Component {
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

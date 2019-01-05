import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class SlackApp extends Component {
  componentWillMount() {
  }

  render() {
    const { name, command } = this.props;
    return (
      <Fragment>
        <div className="slack__tab-group">
          <span className="group_name">{name}</span>
          <hr className="group_divider" />
        </div>
        <div className="slack__tab-item active">
          <div>
            <span className="command">{command}</span>
              [ &lt;notion of time&gt; | book | feedback | help | ... ]
          </div>
          <div>
            <span className="cmddesc">Run Gonebusy commands from anywhere</span>
          </div>
        </div>
      </Fragment>
    );
  }
}

SlackApp.defaultProps = {
  name: 'Gonebusy',
  command: '/gonebusy'
};

SlackApp.propTypes = {
  name: PropTypes.string,
  command: PropTypes.string
};

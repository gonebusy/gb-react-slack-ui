import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class SlackMessage extends Component {
  componentWillMount() {
  }

  render() {
    const { name, cmdname } = this.props;
    return (
      <Fragment>
        <div className="slack__tab-group">
          <span className="group_name">{name}</span>
          <hr className="group_divider" />
        </div>
        <div className="slack__tab-item active">
          <div>
            <span className="cmdname">{cmdname}</span>
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

SlackMessage.defaultProps = {
  name: 'Gonebusy',
  cmdname: '/gonebusy'
};

SlackMessage.propTypes = {
  name: PropTypes.string,
  cmdname: PropTypes.string
};
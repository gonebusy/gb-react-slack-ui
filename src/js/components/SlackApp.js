import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class SlackApp extends Component {
  componentWillMount() {
  }

  commandHelp(command) {
    let text;
    switch(command) {
      case '/gonebusy':
        text = '[ <notion of time> | book | feedback | help | ... ]';
        break;
      default:
        text = null;
    }
    return text;
  }

  commandDescription(command) {
    let text;
    switch(command) {
      case '/gonebusy':
        text = 'Run Gonebusy commands from anywhere';
        break;
      case '/today':
        text = 'Today\'s  events';
        break;
      default:
        text = null;
    }
    return text;
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
            <span className="command">{command} </span>
            { this.commandHelp(command) }
          </div>
          <div>
            <span className="cmddesc">{ this.commandDescription(command) }</span>
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

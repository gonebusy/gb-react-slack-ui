import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import SlackMessage from './slack-message';

import '../../scss/slack.scss';


export default class Slack extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="slack">
        <div className="slack__tabs">
          <SlackMessage />
        </div>
      </div>
    );
  }
}

// Slack.defaultProps = {

// };

// Slack.propTypes = {

// };
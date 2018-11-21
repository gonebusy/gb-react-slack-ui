import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlusThickIcon from '../../assets/svg/plus-thick-icon.svg';
import MentionsIcon from '../../assets/svg/mentions-icon.svg';
import HappySmileIcon from '../../assets/svg/happy-smile-icon.svg';

export default class SlackMessage extends Component {
  componentWillMount() {
  }

  render() {
    const { placeholder } = this.props;
    return (
      <div className="slack__message">
        <div className="slack__message-btn">
          <PlusThickIcon className="slack__icon slack__icon--plus" />
        </div>
        <div className="slack__message-input">
          <div className="slack__message-input-wrapper">
            <div className="slack__message-input-text">
              <div className="slack__message-input-text-inner">
                <span className="text-wrapper">{placeholder}</span>
              </div>
            </div>
            <div className="slack__message-input-mentions">
              <MentionsIcon className="slack__icon" />
            </div>
            <div className="slack__message-input-emo">
              <HappySmileIcon className="slack__icon" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SlackMessage.defaultProps = {
  placeholder: 'Message gonebusy'
};

SlackMessage.propTypes = {
  placeholder: PropTypes.string
};
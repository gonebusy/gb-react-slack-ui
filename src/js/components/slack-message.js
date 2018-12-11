import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SlackText from './slack-text';
import PlusThickIcon from '../../assets/svg/plus-thick-icon.svg';
import MentionsIcon from '../../assets/svg/mentions-icon.svg';
import HappySmileIcon from '../../assets/svg/happy-smile-icon.svg';

export default class SlackMessage extends Component {
  componentWillMount() {
  }

  render() {
    const {
      placeholder,
      text
    } = this.props;

    let className = 'slack__message';
    if (text) {
      className += ' active';
    }
    return (
      <div className={className}>
        <div className="slack__message-btn">
          <PlusThickIcon className="slack__icon slack__icon--plus" />
        </div>
        <div className="slack__message-input">
          <div className="slack__message-input-wrapper">
            <div className="slack__message-input-text">
              <div className="slack__message-input-text-inner">
                {!text && <span className="text-wrapper">{placeholder}</span>}
                {text && <SlackText text={text} />}
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
  placeholder: 'Message gonebusy',
  text: null
};

SlackMessage.propTypes = {
  placeholder: PropTypes.string,
  text: PropTypes.string
};
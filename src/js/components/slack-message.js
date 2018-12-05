import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PlusThickIcon from '../../assets/svg/plus-thick-icon.svg';
import MentionsIcon from '../../assets/svg/mentions-icon.svg';
import HappySmileIcon from '../../assets/svg/happy-smile-icon.svg';

export default class SlackMessage extends Component {
  componentWillMount() {
  }

  renderText() {
    const { text } = this.props;
    const splitted = text.split('@brucewayne');
    return (
      <span className="text-wrapper">
        {splitted[0]}
        {splitted.length > 1 && <span className="text-wrapper slack__mention">@brucewayne</span>}
        {splitted.length > 1 && splitted[1]}
      </span>
    );
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
                {text && this.renderText()}
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
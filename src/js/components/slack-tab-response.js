import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SlackText from './slack-text';
import EyeFilledIcon from '../../assets/svg/eye-filled-icon.svg';

export default class SlackTabResponse extends Component {
  componentWillMount() {
  }

  render() {
    const {
      heading,
      title,
      description,
      members,
      showAddedToGoogleCalender
    } = this.props;
    return (
      <Fragment>
        <div className="slack__label">
          <EyeFilledIcon className="slack__label-icon" />
          <span className="slack__label-text">Only visible to you</span>
        </div>
        <div className="slack__gutter">
          <img className="slack__avatar-image" src="/images/gonebusy-avatar.png" alt="" />
        </div>
        <div className="slack__content" data-qa="message_content">
          <div className="c-message__content_header">
            <span className="c-message__sender">
              <span className="slack__app-name">Gonebusy</span>
              <span className="slack__app-badge">App</span>
              <span className="slack__app-timestamp">{moment().format('h:mm a')}</span>
            </span>
          </div>
          <span className="slack__response-body">{heading}</span>
          <div className="slack__response-attachments">
            <div className="slack__response-attachment">
              <div className="slack__response-attachment-body">
                <div className="slack__response-attachment-author">
                  <img className="slack__response-attachment-author-icon" alt="" src="/images/default-avatar.png" />
                  <span className="slack__response-attachment-author-name">Your Slack Name</span>
                </div>
                <div className="slack__response-attachment-title">{title}</div>
                <div className="slack__response-attachment-text">{description}</div>
                <div className="slack__response-attachment-text">
                  <SlackText text={members} />
                </div>
                {showAddedToGoogleCalender && (
                  <div className="slack__response-attachment-footer">
                    <img alt="" className="slack__response-attachment-footer-icon" src="/images/google-calendar.png" />
                    <span className="slack__response-attachment-footer-text">Added to Google Calendar</span>
                  </div>
                )}
                <div className="slack__response-attachment-text">
                  <span className="slack__response-attachment-button">Edit Details</span>
                  <span className="slack__response-attachment-combo-box">More actions...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>

    );
  }
}

SlackTabResponse.defaultProps = {
  heading: '',
  title: '',
  description: '',
  members: '',
  showAddedToGoogleCalender: false
};

SlackTabResponse.propTypes = {
  heading: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  members: PropTypes.string,
  showAddedToGoogleCalender: PropTypes.bool
};
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SlackMoreActions from './SlackMoreActions';
import SlackText from './SlackText';
import EyeFilledIcon from '../../assets/svg/eye-filled-icon.svg';
import GonebusyAvatar from '../../assets/svg/gonebusy-avatar.svg';
import DefaultAvatar from '../../assets/svg/default-avatar.svg';
import GoogleCalendar from '../../assets/svg/google-calendar.svg';

export default class SlackTabResponse extends Component {
  componentWillMount() {
  }

  refreshAttachment(command) {
    if (command === '/today') {
      return (
        <div className="slack__response-attachment">
            <div className="slack__response-attachment-body no-border">
                <div className="c-message__content_header">
                    <span className="c-message__sender">
                        <span className="slack__app-timestamp">Last Updated | Today at {moment().format('h:mm a')}</span>
                    </span>
                    <div className="slack__response-attachment-text">
                        <span className="slack__response-attachment-button basic">♻<span className="basic">Refresh</span></span>
                    </div>
                </div>
            </div>
        </div>
      );
    }
  }

  render() {
    const {
      command,
      responseHeading,
      events,
      moreActionsRef,
      selectedAction,
      fullDescriptionVisible,
    } = this.props;
    return (
      <Fragment>
          <div className="slack__label">
              <EyeFilledIcon className="slack__label-icon" />
              <span className="slack__label-text">Only visible to you</span>
          </div>
          <div className="slack__gutter">
              <GonebusyAvatar className="slack__avatar-image" />
          </div>
          <div className="slack__content" data-qa="message_content">
              <div className="c-message__content_header">
                  <span className="c-message__sender">
                      <span className="slack__app-name">Gonebusy</span>
                      <span className="slack__app-badge">App</span>
                      <span className="slack__app-timestamp">{moment().format('h:mm a')}</span>
                  </span>
              </div>
              <span className="slack__response-body">{ responseHeading }</span>
              <div className="slack__response-attachments">
                  {
                  events.map((event, i) => (
                  <div key={i} className="slack__response-attachment">
                      <div className="slack__response-attachment-body">
                          <div className="slack__response-attachment-author">
                              <DefaultAvatar className="slack__response-attachment-author-icon" />
                              <span className="slack__response-attachment-author-name">Your Slack Name</span>
                          </div>
                          <div className="slack__response-attachment-title">{ event.responseTitle }</div>
                          <div className="slack__response-attachment-text">{ event.responseDescription }</div>
                          <div className="slack__response-attachment-text">
                              <SlackText text={ event.responseMembers } />
                          </div>
                          {fullDescriptionVisible && (
                          <div className="slack__response-attachment-text-full-description">{ event.responseFullDescription }</div>
                          )}
                          {event.showAddedToGoogleCalender && (
                          <div className="slack__response-attachment-footer">
                              <GoogleCalendar className="slack__response-attachment-footer-icon" />
                              <span className="slack__response-attachment-footer-text">Added to Google Calendar</span>
                          </div>
                          )}
                          <div className="slack__response-attachment-text-actionrow">
                              <span className="slack__response-attachment-button">{ event.buttonText }</span>
                              <SlackMoreActions ref={moreActionsRef} selectedAction={selectedAction} />
                          </div>
                      </div>
                  </div>
                  ))
                  }
        </div>
        { this.refreshAttachment(command) }
        </div>
      </Fragment>

    );
  }
}

SlackTabResponse.defaultProps = {
  command: null,
  responseHeading: '',
  events: [],
};

SlackTabResponse.propTypes = {
  command: PropTypes.string,
  responseHeading: PropTypes.string,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      buttonText: PropTypes.string.isRequired,
      responseTitle: PropTypes.string,
      responseDescription: PropTypes.string,
      responseMembers: PropTypes.string,
      responseShowAddedToGoogleCalender: PropTypes.bool
    })
  ),
  moreActionsRef: PropTypes.object,
  selectedAction: PropTypes.string,
  fullDescriptionVisible: PropTypes.bool,
};

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import SlackMoreActions from './SlackMoreActions';
import SlackText from './SlackText';
import EyeFilledIcon from '../../assets/svg/eye-filled-icon.svg';
import GonebusyAvatar from '../../assets/svg/gonebusy-avatar.svg';
import DefaultAvatar from '../../assets/svg/default-avatar.svg';
import GoogleCalendar from '../../assets/svg/google-calendar.svg';
import cx from 'classnames';

export default class SlackTabResponse extends Component {
  constructor() {
    super();
    this.state = {
      blankCanvas: false,
      showStatusButtons: false,
    }
  }

  showBlankCanvas() {
    this.setState({
      blankCanvas: true
    })
  }

  resetBlankCanvas() {
    this.setState({
      blankCanvas: false
    })
  }

  showStatusButtons() {
    this.setState({
      showStatusButtons: true
    })
  }

  hideStatusButtons() {
    this.setState({
      showStatusButtons: false
    })
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

  renderBlankCanvas() {
    const { blankCanvas } = this.state;

    if (blankCanvas) {
      return (
        <span className="slack__response-attachment-button-blank">blank</span>
      )
    }
  }

  renderPrimaryButtons(buttonLabel) {
    const {
      moreActionsRef,
      selectedAction,
    } = this.props;
    const { blankCanvas, showStatusButtons } = this.state;

    if (!blankCanvas) {
      if (showStatusButtons) {
        return (
          <Fragment>
              <span className="slack__response-attachment-button basic"><span className="basic">No</span></span>
              <span className="slack__response-attachment-button basic"><span className="basic">Maybe</span></span>
              <span className="slack__response-attachment-button">You Accepted</span>
          </Fragment>
        )
      }
      else {
        return (
          <Fragment>
              <span className="slack__response-attachment-button">{ buttonLabel }</span>
              <SlackMoreActions ref={moreActionsRef} selectedAction={selectedAction} />
          </Fragment>
        )
      }
    }
  }

  renderActionButtons(buttonLabel) {
    return (
      <Fragment>
        { this.renderBlankCanvas() }
        { this.renderPrimaryButtons(buttonLabel) }
      </Fragment>
    )
  }

  render() {
    const {
      command,
      responseHeading,
      events,
      fullDescriptionVisible,
    } = this.props;
    const { blankCanvas } = this.state;
    return (
      <Fragment>
          <div className="slack__label">
              { !blankCanvas && (
                  <EyeFilledIcon className="slack__label-icon" />
              )}
              <span className={ cx('slack__label-text', { 'blank': blankCanvas }) }>Only visible to you</span>
          </div>
          <div className="slack__gutter">
              { !blankCanvas && (
                  <GonebusyAvatar className="slack__avatar-image" />
              )}
          </div>
          <div className={ cx('slack__content', { 'blank': blankCanvas }) } data-qa="message_content">
            <div className="c-message__content_header">
                <span className="c-message__sender">
                    <span className={ cx("slack__app-name", { 'blank': blankCanvas }) }>Gonebusy</span>
                    <span className={ cx("slack__app-badge", { 'blank': blankCanvas }) }>App</span>
                    <span className={ cx("slack__app-timestamp", { 'blank': blankCanvas }) }>{moment().format('h:mm a')}</span>
                </span>
            </div>
            <span className="slack__response-body">{ responseHeading }</span>
            <div className="slack__response-attachments">
                {
                  events.map((event, i) => (
                    <div key={i} className="slack__response-attachment">
                        <div className={ cx("slack__response-attachment-body", { 'no-border': blankCanvas }) }>
                            <div className="slack__response-attachment-author">
                                { !blankCanvas && (
                                    <DefaultAvatar className="slack__response-attachment-author-icon" />
                                )}
                                <span className={ cx('slack__response-attachment-author-name', { 'blank': blankCanvas }) }>Your Slack Name</span>
                            </div>
                            <div className="slack__response-attachment-title">{ event.responseTitle }</div>
                            <div className="slack__response-attachment-text">{ event.responseDescription }</div>
                            <div className="slack__response-attachment-text">
                                <SlackText text={ event.responseMembers } blank={blankCanvas} />
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
                              { this.renderActionButtons(event.buttonText) }
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

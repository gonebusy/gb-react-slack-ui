import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenLite, Linear } from 'gsap';
import SlackMessage from './slack-message';
import SlackTab from './slack-tab';
import SlackApp from './slack-app';
import SlackTabMember from './slack-tab-member';
import SlackTabResponse from './slack-tab-response';
import members from '../../data/members.json';
import 'gsap/TextPlugin';

import '../../scss/slack.scss';

export default class Slack extends Component {
  constructor() {
    super();
    this.state = {
      messageText: null,
      showResponse: false
    };
  }

  componentDidMount() {
    TweenLite.delayedCall(1, () => {
      this.animate();
    });
  }

  animate() {
    const { message } = this.props;

    let span = document.createElement('span');
    const speed = 8;
    TweenLite.to(span, message.length / speed, {
      text: message,
      onUpdate: () => {
        this.setState({ messageText: span.textContent });
      },
      onComplete: () => {
        TweenLite.delayedCall(1, () => {
          this.setState({
            messageText: null
          });
        });

        TweenLite.delayedCall(1.2, () => {
          this.setState({
            showResponse: true
          });
        });

        return;

        TweenLite.delayedCall(8, () => {
          this.setState({
            showResponse: false
          });
          this.animate();
        });
        span = null;
      },
      ease: Linear.easeNone
    });
  }

  renderMember(member, i, search) {
    return member.name.indexOf(search) > -1 && (
      <SlackTabMember
        key={i}
        online={member.online}
        label={member.label}
        active={member.active}
        name={member.name}
        secondaryName={member.secondaryName}
      />
    );
  }

  renderMembers(search) {
    return members.map((member, i) => this.renderMember(member, i, search));
  }

  render() {
    const {
      command,
      responseHeading,
      responseTitle,
      responseDescription,
      responseMembers,
      responseShowAddedToGoogleCalender
    } = this.props;
    const { messageText, showResponse } = this.state;
    const appSearch = String(messageText).match(/\/[a-z]+$/);
    const userSearch = String(messageText).match(/@[a-z]+$/);

    return (
      <div className="slack">
        <div className="slack__tabs">
          {userSearch && (
            <SlackTab>
              {this.renderMembers(userSearch[0].substring(1))}
            </SlackTab>
          )
          }
          {appSearch && (
            <SlackTab>
              <SlackApp command={command} />
            </SlackTab>
          )
          }
          {showResponse && (
            <SlackTab className="slack__tab--response" header={false}>
              <SlackTabResponse
                heading={responseHeading}
                title={responseTitle}
                description={responseDescription}
                members={responseMembers}
                showAddedToGoogleCalender={responseShowAddedToGoogleCalender}
              />
            </SlackTab>
          )}
        </div>
        <SlackMessage text={messageText} ref={(ref) => { this.message = ref; }} />
      </div>
    );
  }
}

Slack.defaultProps = {
  message: '',
  command: '/gonebusy',
  responseHeading: '',
  responseTitle: '',
  responseDescription: '',
  responseMembers: '',
  responseShowAddedToGoogleCalender: false
};

Slack.propTypes = {
  message: PropTypes.string,
  command: PropTypes.string,
  responseHeading: PropTypes.string,
  responseTitle: PropTypes.string,
  responseDescription: PropTypes.string,
  responseMembers: PropTypes.string,
  responseShowAddedToGoogleCalender: PropTypes.bool
};

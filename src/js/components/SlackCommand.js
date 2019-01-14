import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TweenLite, Linear } from 'gsap';
import SlackMessage from './SlackMessage';
import SlackTab from './SlackTab';
import SlackApp from './SlackApp';
import SlackTabMember from './SlackTabMember';
import SlackTabResponse from './SlackTabResponse';
import members from '../../data/members.json';
import 'gsap/TextPlugin';
import $ from 'jquery';
import '../../scss/slack.scss';

export default class SlackCommand extends Component {
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
    const speed = 9;
    TweenLite.to(span, message.length / speed, {
      text: message,
      onStart: () => {
          const coords = this.target.getBoundingClientRect()
          if (thisLetter) {
            const pos = thisLetter.offset()
            const width = thisLetter.width()
            cursor.css({left:pos.left + width, top:pos.top})
          }
      },
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
      events,
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
             <SlackTab className="slack__tab-response" header={false}>
               <SlackTabResponse
                 command={command}
                 responseHeading={responseHeading}
                 events={events}
               />
            </SlackTab>
          )}
        </div>
        <SlackMessage text={messageText} ref={(ref) => { this.message = ref; }} />
      </div>
    );
  }
}

SlackCommand.defaultProps = {
  command: '',
  message: '',
  responseHeading: '',
  events: [],
};

SlackCommand.propTypes = {
  command: PropTypes.string,
  message: PropTypes.string,
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
};

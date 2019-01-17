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
import '../../scss/slack.scss';

export default class SlackActionSelect extends Component {
  constructor() {
    super();
    this.moreActionsRef = React.createRef();
    this.state = {
      fullDescriptionVisible: false
    }
  }

  showFullDescription() {
      this.setState({
          fullDescriptionVisible: true
      });
  }

  hideFullDescription() {
      this.setState({
          fullDescriptionVisible: false
      });
  }

  componentDidMount() {
      this.animate();
  }

  animate() {
      TweenLite.delayedCall(2, () => {
          this.moreActionsRef.current.selectMoreActions();
          TweenLite.delayedCall(.5, () => {
              this.moreActionsRef.current.showDropdown();
              TweenLite.delayedCall(1, () => {
                  this.moreActionsRef.current.resetState();
                  this.showFullDescription();
                  TweenLite.delayedCall(5, () => {
                      this.hideFullDescription();
                      this.animate();
                  });
              });
          });
      });
  }

  render() {
    const {
      command,
      message,
      responseHeading,
      selectedAction,
      events,
    } = this.props;
    const { fullDescriptionVisible } = this.state;

    return (
      <div className="slack">
          <div className="slack__tabs">
              <SlackTab className="slack__tab-response" header={false}>
                  <SlackTabResponse
                    command={command}
                    responseHeading={responseHeading}
                    events={events}
                    moreActionsRef={this.moreActionsRef}
                    selectedAction={ selectedAction }
                    fullDescriptionVisible={fullDescriptionVisible}
                  />
              </SlackTab>
          </div>
          <SlackMessage text={message} />
      </div>
    );
  }
}

SlackActionSelect.defaultProps = {
  command: '',
  message: '',
  responseHeading: '',
  events: [],
};

SlackActionSelect.propTypes = {
  command: PropTypes.string,
  message: PropTypes.string,
  responseHeading: PropTypes.string,
  selectedAction: PropTypes.string,
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

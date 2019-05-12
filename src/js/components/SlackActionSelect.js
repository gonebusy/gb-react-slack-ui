import React, { Component } from 'react';
import handleViewport from 'react-in-viewport';
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
import cx from 'classnames';

class SlackActionSelectBlock extends Component {
  constructor() {
    super();
    this.moreActionsRef = React.createRef();
    this.tabRef = React.createRef();
    this.state = {
      blankResponse: false,
      fullDescriptionVisible: false,
      animationRunning: false,
    }
  }

  componentDidMount() {
    this.animate();
  }

  componentDidUpdate() {
    this.animate()
  }

  runningAnimation() {
    this.setState({
      animationRunning: true
    })
  }

  stopAnimation() {
    this.setState({
      animationRunning: false
    })
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

  showBlankResponse() {
    this.setState({
      blankResponse: true
    })
  }

  resetBlankResponse() {
    this.setState({
      blankResponse: false
    })
  }

  loop() {
    TweenLite.delayedCall(.25, () => {
      this.stopAnimation();
      this.animate();
    });
  }

  handleAction() {
    const {
      selectedAction,
    } = this.props;

    switch(selectedAction) {
      case 'Update Event Status':
        this.tabRef.current.showStatusButtons();
        TweenLite.delayedCall(4, () => {
          this.tabRef.current.showBlankCanvas();
          this.showBlankResponse();
          this.tabRef.current.hideStatusButtons();
          this.loop();
        });
        break;
      case 'View Description':
        this.showFullDescription();
        TweenLite.delayedCall(4, () => {
          this.tabRef.current.showBlankCanvas();
          this.showBlankResponse();
          this.hideFullDescription();
          this.loop();
        });
        break;
    }
  }

  animate() {
    // inViewport from react-in-viewport
    const { inViewport } = this.props;
    const { animationRunning } = this.state;

    if (inViewport && !animationRunning) {
      this.runningAnimation();
      this.tabRef.current.resetBlankCanvas();
      this.resetBlankResponse();
      TweenLite.delayedCall(1, () => {
        this.moreActionsRef.current.selectMoreActions();
        TweenLite.delayedCall(.25, () => {
          this.moreActionsRef.current.showDropdown();
          TweenLite.delayedCall(.75, () => {
            this.moreActionsRef.current.resetState();
            this.handleAction();
          });
        });
      });
    }
  }

  render() {
    const {
      command,
      message,
      responseHeading,
      selectedAction,
      events,
    } = this.props;
    const { blankResponse, fullDescriptionVisible } = this.state;

    return (
      <div className="slack">
          <div className="slack__tabs">
              <SlackTab className={ cx('slack__tab-response', { 'blank': blankResponse }) } header={false}>
                  <SlackTabResponse
                    ref={this.tabRef}
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

SlackActionSelectBlock.defaultProps = {
  command: '',
  message: '',
  responseHeading: '',
  events: [],
};

SlackActionSelectBlock.propTypes = {
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

const SlackActionSelect = handleViewport(SlackActionSelectBlock, { threshold: 0.75 });

export default SlackActionSelect;

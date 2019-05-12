import React, { Component } from 'react'
import handleViewport from 'react-in-viewport'
import PropTypes from 'prop-types'
import { TweenLite, Linear } from 'gsap'
import SlackMessage from './SlackMessage'
import SlackTab from './SlackTab'
import SlackApp from './SlackApp'
import SlackTabMember from './SlackTabMember'
import SlackTabResponse from './SlackTabResponse'
import members from '../../data/members.json'
import 'gsap/TextPlugin'
import '../../scss/slack.scss'

class SlackCommandBlock extends Component {
  constructor() {
    super()
    this.state = {
      messageText: null,
      showResponse: false,
      animationRunning: false,
    }
  }

  componentDidMount() {
    this.animate()
  }

  componentDidUpdate() {
    this.animate()
  }

  runningAnimation() {
    this.setState({
      animationRunning: true,
    })
  }

  stopAnimation() {
    this.setState({
      animationRunning: false,
    })
  }

  animate() {
    // inViewport from react-in-viewport
    const { message, inViewport } = this.props
    const { animationRunning } = this.state

    if (inViewport && !animationRunning) {
      this.runningAnimation()
      let show = { count: 0 }
      const speed = 10
      TweenLite.delayedCall(1, () => {
        TweenLite.to(show, message.length / speed, {
          count: message.length,
          onUpdate: () => {
            this.setState({ messageText: message.substr(0, show.count) })
          },
          onComplete: () => {
            TweenLite.delayedCall(1, () => {
              this.setState({
                messageText: null,
              })
            })

            TweenLite.delayedCall(1.2, () => {
              this.setState({
                showResponse: true,
              })
            })

            TweenLite.delayedCall(8, () => {
              this.setState({
                showResponse: false,
              })
              this.stopAnimation()
              this.animate()
            })
          },
          ease: Linear.easeNone,
        })
      })
    }
  }

  renderMember(member, i, search) {
    return (
      member.name.indexOf(search) > -1 && (
        <SlackTabMember
          key={i}
          online={member.online}
          label={member.label}
          active={member.active}
          name={member.name}
          secondaryName={member.secondaryName}
        />
      )
    )
  }

  renderMembers(search) {
    return members.map((member, i) => this.renderMember(member, i, search))
  }

  render() {
    const { command, responseHeading, response_lines } = this.props
    const { messageText, showResponse } = this.state
    const appSearch = String(messageText).match(/\/[a-z]+$/)
    const userSearch = String(messageText).match(/@[a-z]+$/)

    return (
      <div className="slack">
        <div className="slack__tabs">
          {userSearch && (
            <SlackTab>
              {this.renderMembers(userSearch[0].substring(1))}
            </SlackTab>
          )}
          {appSearch && (
            <SlackTab>
              <SlackApp command={command} />
            </SlackTab>
          )}
          {showResponse && (
            <SlackTab className="slack__tab-response" header={false}>
              <SlackTabResponse
                command={command}
                responseHeading={responseHeading}
                response_lines={response_lines}
              />
            </SlackTab>
          )}
        </div>
        <SlackMessage
          text={messageText}
          ref={ref => {
            this.message = ref
          }}
        />
      </div>
    )
  }
}

SlackCommandBlock.defaultProps = {
  command: '',
  message: '',
  responseHeading: '',
  response_lines: [],
}

SlackCommandBlock.propTypes = {
  command: PropTypes.string,
  message: PropTypes.string,
  responseHeading: PropTypes.string,
  response_lines: PropTypes.arrayOf(
    PropTypes.shape({
      buttonText: PropTypes.string.isRequired,
      responseTitle: PropTypes.string,
      responseDescription: PropTypes.string,
      responseMembers: PropTypes.string,
      responseShowAddedToGoogleCalender: PropTypes.bool,
    })
  ),
}

const SlackStatusCommand = handleViewport(SlackCommandBlock, {
  threshold: 0.75,
})

export default SlackStatusCommand

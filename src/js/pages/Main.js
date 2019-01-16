import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import SlackCommand from '../components/SlackCommand';
import SlackActionSelect from '../components/SlackActionSelect';

import '../../scss/main.scss';
import '../../assets/favicon.ico';

const Main = function() {
  return (
      <Fragment>
          <section className="demo">
              <SlackCommand
                  message="/gonebusy book Interview with @brucewayne @wonderwoman @joker @brucelee about something really long and lengthy tomorrow at 1pm"
                  responseHeading="You're all set."
                  events={[
                      {
                          buttonText: "Edit Details",
                          responseTitle: "Interview with Bruce Wayne",
                          responseDescription: `${moment().add(1, 'days').format('MMMM Do')} from 1PM to 2PM`,
                          responseMembers: "With @yourslackname, @brucewayne",
                          responseShowAddedToGoogleCalender: true
                      }
                  ]}
              />
              <div className="demo__content">
                  <h1 className="demo__heading">Never leave Slack to get more from your Google Calendar.</h1>
                  <p className="demo__description">Easily book meetings, find that Hangout you&apos;re late for, or just keep your schedule up to date with smart filters – all within Slack.</p>
                  <a className="demo__link" href="http://slack.com" title="AddToSlack" data-reveal-id="connect-calendar-modal">
                      <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
                  </a>
              </div>
          </section>
          <section className="demo">
              <SlackCommand
                  command="/today"
                  message="this shows the /today functionality"
                  responseHeading="Here's today:"
                  events={[
                      {
                          responseTitle: "Coffee",
                          responseDescription: "☕ today from 10:00AM to 10:30AM",
                          responseMembers: "With @yourslackname, @joker, @brucewayne",
                          buttonText: "Join Meeting"
                      }
                  ]}
              />
          </section>
          <section className="demo">
              <SlackCommand
                  command="/gonebusy"
                  message="/gonebusy this week"
                  responseHeading="You're all set."
                  events={[
                      {
                          buttonText: "Edit Details",
                          responseTitle: "Monday",
                          responseDescription: `${moment().startOf('isoWeek').weekday(8).format('MMMM Do')} from 1PM to 2PM`,
                          responseMembers: "With @yourslackname, @harleyquinn",
                          responseShowAddedToGoogleCalender: true
                      },
                      {
                          buttonText: "Edit Details",
                          responseTitle: "Friday",
                          responseDescription: `${moment().startOf('isoWeek').weekday(8).format('MMMM Do')} from 1PM to 2PM`,
                          responseMembers: "With @yourslackname, @joker, client@example.com",
                          responseShowAddedToGoogleCalender: true
                      },
                  ]}
              />
          </section>
          <section className="demo">
              <SlackActionSelect
                  responseHeading="You're all set."
                  events={[
                      {
                          buttonText: "Edit Details",
                          responseTitle: "Interview with Bruce Wayne",
                          responseDescription: `${moment().add(1, 'days').format('MMMM Do')} from 1PM to 2PM`,
                          responseMembers: "With @yourslackname, @brucewayne",
                          responseShowAddedToGoogleCalender: true
                      }
                  ]}
              />
          </section>xs              
      </Fragment>
  );
};

export default Main;

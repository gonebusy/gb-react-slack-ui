import React, { Component } from 'react';
import SlackMessage from './slack-message';
import SlackTab from './slack-tab';
import SlackApp from './slack-app';
import SlackTabMember from './slack-tab-member';
import SlackTabResponse from './slack-tab-response';
import '../../scss/slack.scss';

export default class Slack extends Component {
  componentWillMount() {
  }

  render() {
    return (
      <div className="slack">
        <div className="slack__tabs">
          <SlackTab>
            <SlackTabMember
              online
              active
              name="brucewayne"
              secondaryName="Bruce Wayne"
            />
            <SlackTabMember
              online
              label="APP"
              name="gonebusy"
              secondaryName="Gonebusy"
            />
            <SlackTabMember
              name="joker"
              secondaryName="Jack Napier"
            />
            <SlackTabMember
              online
              name="harleyquinn"
              secondaryName="Harley Quinn"
            />
            <SlackTabMember
              name="posionivy"
              secondaryName="Maggie Geha"
            />
          </SlackTab>
          <SlackTab>
            <SlackApp />
          </SlackTab>
          <SlackTab className="slack__tab--response" header={false}>
            <SlackTabResponse />
          </SlackTab>
        </div>
        <SlackMessage />
      </div>
    );
  }
}

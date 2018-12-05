import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Slack from './components/slack';

import '../scss/main.scss';
import '../assets/favicon.ico';

const Main = function() {
  return (
    <Fragment>
      <section className="demo">
        <Slack
          message="/gonebusy book Interview with @brucewayne tomorrow at 1pm"
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
        <Slack
          message="this shows the /today functionality"
          command="/today"
        />
      </section>
      <section className="demo">
        <Slack
          message="Monday, I could book something completely different with @brucewayne with /gonebusy"
        />
      </section>
    </Fragment>
  );
};

ReactDOM.render(<Main />, document.getElementById('root'));
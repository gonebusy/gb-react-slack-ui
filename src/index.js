import React from 'react';
import ReactDOM from 'react-dom';
import Main from './js/main'

ReactDOM.render(<Main />, document.getElementById('root'));

export { default as Slack } from './js/components/slack'
export { default as SlackApp } from './js/components/slack-app'
export { default as SlackMessage } from './js/components/slack-message'
export { default as SlackTab } from './js/components/slack-tab'
export { default as SlackTabHeader } from './js/components/slack-tab-header'
export { default as SlackTabMember } from './js/components/slack-tab-member'
export { default as SlackTabResponse } from './js/components/slack-tab-response'
export { default as SlackText } from './js/components/slack-text'

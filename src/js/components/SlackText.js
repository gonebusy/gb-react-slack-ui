import React, { Component } from 'react';
import PropTypes from 'prop-types';
import members from '../../data/members.json';

export default class SlackText extends Component {
  componentWillMount() {
  }

  render() {
    let {
      text
    } = this.props;

    if (text.indexOf('@yourslackname') > -1) {
      const splitted = text.split('@yourslackname');
      text = `${splitted[0]}<span class="slack__mention slack__mention--self">@yourslackname</span>${splitted[1]}`;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const username = `@${member.name}`;

      if (text.indexOf(username) > -1) {
        const splitted = text.split(username);
        text = `${splitted[0]}<span class="slack__mention">${username}</span>${splitted[1]}`;
      }
    }
    /* eslint-disable */
    return <div dangerouslySetInnerHTML={{__html: text}} />
    /* eslint-enable */
  }
}

SlackText.defaultProps = {
  text: null
};

SlackText.propTypes = {
  text: PropTypes.string
};
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import members from '../../data/members.json';

export default class SlackText extends Component {
  componentDidUpdate() {
  }

  render() {
    let {
      text,
      blank,
    } = this.props;

    if (text.indexOf('@yourslackname') > -1) {
      const splitted = text.split('@yourslackname');
      if (blank)
        text = `${splitted[0]}<span class="slack__mention slack__mention--self blank">@yourslackname</span>${splitted[1]}`;
      else
        text = `${splitted[0]}<span class="slack__mention slack__mention--self">@yourslackname</span>${splitted[1]}`;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i];

      if (text.indexOf(member.name) > -1) {
        const splitted = text.split(member.name);
        if (blank)
          text = `${splitted[0]}<span class="slack__mention blank">${member.name}</span>${splitted[1]}`;
        else
          text = `${splitted[0]}<span class="slack__mention">${member.name}</span>${splitted[1]}`;
      }
    }

    /* eslint-disable */
    return (
      <div dangerouslySetInnerHTML={{__html: text}} />
    )
    /* eslint-enable */
  }
}

SlackText.defaultProps = {
  text: null,
  blank: false,
};

SlackText.propTypes = {
  text: PropTypes.string,
  blank: PropTypes.bool,
};

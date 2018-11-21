import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class SlackTabMember extends Component {
  componentWillMount() {
  }

  render() {
    const {
      active,
      online,
      imagePath,
      name,
      label,
      secondaryName
    } = this.props;
    return (
      <div className={`slack__member ${active ? 'slack__member--active' : ''}`}>
        <span className={`slack__member-presence ${!online ? 'slack__member-presence--offline' : ''}`}>
          <span className="slack__member-presence-icon" />
        </span>
        <span className="slack__member-thumb" {...(imagePath ? { style: { backgroundImage: `url('${imagePath}')` } } : {})} />
        <span className="slack__member-name">{name}</span>
        {label && <span className="slack__member-label">{label}</span>}
        <span className="slack__member-secondary-name">{secondaryName}</span>
      </div>
    );
  }
}

SlackTabMember.defaultProps = {
  active: false,
  online: false,
  label: null,
  imagePath: null,
  name: '',
  secondaryName: ''
};

SlackTabMember.propTypes = {
  active: PropTypes.bool,
  online: PropTypes.bool,
  label: PropTypes.string,
  imagePath: PropTypes.string,
  name: PropTypes.string,
  secondaryName: PropTypes.string
};
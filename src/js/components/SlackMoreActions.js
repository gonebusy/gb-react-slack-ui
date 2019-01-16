import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class SlackMoreActions extends Component {
    constructor() {
        super();
        this.state = {
            showActions: false
        };
    }

    componentWillMount() {
    }

    render() {
        const { moreActionsRef } = this.props;
        return (
            <div className="slack__more_actions-container">
                <span className="slack__response-attachment-combo-box" ref={moreActionsRef}>More actions...</span>
            </div>
        )
    }
}

SlackMoreActions.defaultProps = {
    actions: ['Share Event', 'Update Status'],
};

SlackMoreActions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.string
    ),
    moreActionsRef: PropTypes.object,
};

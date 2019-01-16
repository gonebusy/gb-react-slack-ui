import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

export default class SlackMoreActions extends Component {
    constructor() {
        super();
        this.state = {
            showActions: true
        };
    }

    componentWillMount() {
    }

    renderAction(action) {
        return (
            <div key={ action } className="slack__more_actions-dropdown-action">{ action }</div>
        )
    }
    
    renderActionsDropdown() {
        const { showActions } = this.state
        if (!showActions)
            return null

        const { actions } = this.props
        return (
            <div className="slack__more_actions-dropdown">
                { actions.map(action => this.renderAction(action)) }
            </div>
        )
    }

    render() {
        const { moreActionsRef } = this.props;
        return (
            <div className="slack__more_actions-container">
                { this.renderActionsDropdown() }
                <span className="slack__response-attachment-combo-box" ref={moreActionsRef}>More actions...</span>
            </div>
        )
    }
}

SlackMoreActions.defaultProps = {
    actions: ['Share Event', 'Update Status', 'View All Attendees', 'View Description', 'Delete Event'],
};

SlackMoreActions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.string
    ),
    moreActionsRef: PropTypes.object,
};

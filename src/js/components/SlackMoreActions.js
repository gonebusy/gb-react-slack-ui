import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

export default class SlackMoreActions extends Component {
    constructor() {
        super();
        this.state = {
            moreActionsSelected: false,
            showActions: false,
        };
    }

    resetState() {
        this.setState({
            moreActionsSelected: false,
            showActions: false,
        })
    }

    selectMoreActions() {
        this.setState({
            moreActionsSelected: true
        })
    }

    unselectMoreActions() {
        this.setState({
            moreActionsSelected: false
        })
    }

    showDropdown() {
        this.setState({
            showActions: true
        })
    }

    hideDropdown() {
        this.setState({
            showActions: false
        })
    }

    renderAction(action) {
        const { selectedAction } = this.props
        const { showActions } = this.state
        return (
            <div key={ action } className={ cx('slack__more_actions-dropdown-action', { 'active': showActions && selectedAction === action }) }>{ action }</div>
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
        const { moreActionsSelected } = this.state
        return (
            <div className="slack__more_actions-container">
                { this.renderActionsDropdown() }
                <span className={ cx('slack__response-attachment-combo-box', { 'active': moreActionsSelected }) } ref={moreActionsRef}>More actions...</span>
            </div>
        )
    }
}

SlackMoreActions.defaultProps = {
    actions: ['Share Event', 'Update Status', 'View All Attendees', 'View Description', 'Delete Event'],
    selectedAction: '',
};

SlackMoreActions.propTypes = {
    actions: PropTypes.arrayOf(
        PropTypes.string
    ),
    moreActionsRef: PropTypes.object,
    selectedAction: PropTypes.string,
};

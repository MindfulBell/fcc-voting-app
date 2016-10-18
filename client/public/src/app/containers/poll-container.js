import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Chart from '../components/Chart';
import AddOption from '../components/add-option';
import { refreshPoll, emptyPoll, deletePoll, clearPollError } from '../actions/index';

class PollContainer extends Component {
	constructor(props) {
		super(props);

		this.processVote = this.processVote.bind(this);
		this.addOption = this.addOption.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.activePoll && _.isEmpty(nextProps.activePoll)) {
			this.props.router.push(`/user/${this.props.user.id}`)
		}
	}

	componentWillMount() {
		// Set the active poll based on the params above
		this.props.refreshPoll(this.props.params.pollId);

		// If next props.options length > current props options length, then add a color to background color array?

	}

	componentWillUnmount() {
		// remove active poll to prevent flashing of options on poll switch, also helps manage creating new poll flow
		this.props.emptyPoll();
		this.props.clearPollError();
	}

	processVote(pollId, votedFor) {
		this.props.refreshPoll(pollId, votedFor);
	}

	addOption(value) {
		this.props.refreshPoll(this.props.activePoll.id, value, true, this.props.user.auth.token);
	}

	handleDelete() {
		this.props.deletePoll(this.props.activePoll.id, this.props.user.auth.token)
	}

	render() {
		return(
			<div>
				<Chart
					title={this.props.activePoll.title}
					options={this.props.activePoll.options}
					totalVotes={this.props.activePoll.totalVotes}
					id={this.props.activePoll.id}
					isLoading={this.props.isLoading}
					processVote={this.processVote} 
				/>
				<AddOption
					handleDelete={this.handleDelete}
					loggedIn={this.props.user.loggedIn}
					title={this.props.activePoll.title}
					createdByActiveUser={this.props.activePoll.createdBy === this.props.user.id} 
					isLoading={this.props.isLoading}
					addOption={this.addOption}
					errorMessage={this.props.errorMessage}
				/>
			</div>
		)
	}
}
// REDUX 

const mapStateToProps = (state) => {
	return {
		activePoll: state.polls.activePoll,
		user: state.user,
		errorMessage: state.polls.pollErrorMessage,
		isLoading: state.loader.isLoading
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			refreshPoll: (id, votedFor, newOption, token) => {dispatch(refreshPoll(id, votedFor, newOption, token))},
			emptyPoll: () => { dispatch(emptyPoll()) },
			deletePoll: (id, token) => { dispatch(deletePoll(id, token)) },
			clearPollError: () => { dispatch(clearPollError()) }
		}
	}

PollContainer = withRouter(PollContainer);

export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
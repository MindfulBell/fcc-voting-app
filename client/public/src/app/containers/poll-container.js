import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Chart from '../components/Chart';
import AddOption from '../components/add-option';
import { emptyPoll, deletePoll, clearPollError, voteOnPoll, getPoll, resetSuccess } from '../actions/index';

class PollContainer extends Component {
	constructor(props) {
		super(props);

		this.processVote = this.processVote.bind(this);
		this.addOption = this.addOption.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
	}

	componentWillMount() {
		// Set the active poll based on the params above
		this.props.getPoll(this.props.params.pollId);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return !nextProps.isLoading;
	}

	componentWillUnmount() {
		// remove active poll to prevent flashing of options on poll switch, also helps manage creating new poll flow
		this.props.emptyPoll();
		this.props.clearPollError();
	}

	processVote(pollId, votedFor) {
		this.props.voteOnPoll(pollId, votedFor);
	}

	addOption(value) {
		console.log(value);
		this.props.voteOnPoll(this.props.activePoll.id, value, true, this.props.user.auth.token);
	}

	handleDelete() {
		this.props.deletePoll(this.props.activePoll.id, this.props.user.auth.token);
		this.props.router.push(`/user/${this.props.user.id}`);
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
		isLoading: state.loader.isLoading,
		deleteSuccess: state.polls.deleteSuccess
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			emptyPoll: () => { dispatch(emptyPoll()) },
			deletePoll: (pollId, token) => { dispatch(deletePoll(pollId, token)) },
			clearPollError: () => { dispatch(clearPollError()) },
			voteOnPoll: (pollId, votedFor, newOption, token) => { dispatch(voteOnPoll(pollId, votedFor, newOption, token)) },
			getPoll: (pollId) => { dispatch(getPoll(pollId)) },
			resetSuccess: () => { dispatch(resetSuccess()) }
		}
	}

PollContainer = withRouter(PollContainer);

export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
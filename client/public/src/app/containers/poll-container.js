import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Poll from '../components/poll';
import { refreshPoll, emptyPoll, deletePoll, clearPollError } from '../actions/index';

class PollContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newOptionVal: ''
		}

		this.processVote = this.processVote.bind(this);
		this.addOption = this.addOption.bind(this);
		this.updateValue = this.updateValue.bind(this);
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

	addOption() {
		this.props.refreshPoll(this.props.activePoll.id, this.state.newOptionVal, true, this.props.user.auth.token);
		this.setState({
			newOptionVal: ''
		});
	}

	updateValue(value) {
		this.setState({
			newOptionVal: value
		});
	}

	handleDelete() {
		this.props.deletePoll(this.props.activePoll.id, this.props.user.auth.token)
	}

	render() {
		console.log(this.state.backgroundColors)
		return(
			<Poll
				createdByActiveUser={this.props.activePoll.createdBy === this.props.user.id} 
				processVote={this.processVote}
				title={this.props.activePoll.title}
				options={this.props.activePoll.options}
				lastOptionsLength={this.props.activePoll.options.length - 1}
				totalVotes={this.props.activePoll.totalVotes}
				id={this.props.activePoll.id}
				loggedIn={this.props.user.loggedIn}
				value={this.state.newOptionVal}
				updateValue={this.updateValue}
				addOption={this.addOption}
				handleDelete={this.handleDelete}
				errorMessage={this.props.errorMessage}
				isLoading={this.props.isLoading}
				backgroundColors={this.state.backgroundColors}
			/>
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
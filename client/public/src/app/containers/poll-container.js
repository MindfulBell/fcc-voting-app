import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Poll from '../components/poll';
import { refreshPoll, emptyPoll, deletePoll } from '../actions/index';

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

	componentWillMount() {
		// Set the active poll based on the params above...it works...but not getting the info in time to render it...
		this.props.refreshPoll(this.props.params.pollId);
	}

	componentWillUnmount() {
		// remove active poll to prevent flashing of options on poll switch, also helps manage creating new poll flow
		this.props.emptyPoll();
	}

	processVote(pollId, votedFor) {
		this.props.refreshPoll(pollId, votedFor);
	}

	addOption() {
		this.props.refreshPoll(this.props.activePoll._id, this.state.newOptionVal, true, this.props.user.auth.token);
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
		this.props.deletePoll(this.props.activePoll._id, this.props.user.auth.token);
	}

	render() {
		return(
			<Poll
				createdByActiveUser={this.props.activePoll.createdBy === this.props.user.id} 
				processVote={this.processVote}
				title={this.props.activePoll.title}
				options={this.props.activePoll.options}
				totalVotes={this.props.activePoll.totalVotes}
				id={this.props.activePoll._id}
				loggedIn={this.props.user.loggedIn}
				value={this.state.newOptionVal}
				updateValue={this.updateValue}
				addOption={this.addOption}
				handleDelete={this.handleDelete}
			/>
		)
	}
}
// REDUX 

const mapStateToProps = (state) => {
	return {
		activePoll: state.polls.activePoll,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			refreshPoll: (id, votedFor, newOption, token) => {dispatch(refreshPoll(id, votedFor, newOption, token))},
			emptyPoll: () => { dispatch(emptyPoll()) },
			deletePoll: (id, token) => { dispatch(deletePoll(id, token)) }
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
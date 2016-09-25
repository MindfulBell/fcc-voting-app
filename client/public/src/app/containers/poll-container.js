import React, { Component } from 'react';
import { connect } from 'react-redux';

import Poll from '../components/poll';
import { refreshPoll, emptyPoll } from '../actions/index';

class PollContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initial: true
		}

		this.processVote = this.processVote.bind(this);
	}

	componentWillMount() {
		// Set the active poll based on the params above...it works...but not getting the info in time to render it...
		this.props.refreshPoll(this.props.params.pollId);
	}

	componentWillUnmount() {
		// remove active poll to prevent flashing of options on poll switch
		this.props.emptyPoll()
	}

	processVote(pollId, votedFor) {
		this.props.refreshPoll(pollId, votedFor);
	}

	render() {
		return(
			<Poll 
				processVote={this.processVote}
				title={this.props.activePoll.title}
				options={this.props.activePoll.options}
				totalVotes={this.props.activePoll.totalVotes}
				id={this.props.activePoll._id}
			/>
		)
	}
}
// REDUX 

const mapStateToProps = (state) => {
	return {
		activePoll: state.polls.activePoll
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			refreshPoll: (id, votedFor, newOption) => {dispatch(refreshPoll(id, votedFor, newOption))},
			emptyPoll: () => { dispatch(emptyPoll()) }
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
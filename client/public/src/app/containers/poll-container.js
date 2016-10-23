import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import _ from 'lodash';

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
		this.props.resetSuccess();
		// check if user's IP is in the poll object and send a prop to add option to display "THANKS FOR VOTING"
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.deleteSuccess) {
			this.props.router.push(`/user/${this.props.user.id}`);
		}
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
		this.props.voteOnPoll(pollId, votedFor, null, null, this.props.user.ip);
	}

	addOption(value) {
		this.props.voteOnPoll(this.props.activePoll.id, value, true, this.props.user.auth.token, this.props.user.ip);
	}

	handleDelete() {
		this.props.deletePoll(this.props.activePoll.id, this.props.user.auth.token);
	}

	checkIfVoted(pollId) {

	}

	render() {
		const alreadyVoted = this.props.activePoll.usersVoted ? this.props.activePoll.usersVoted.includes(this.props.user.ip) : false,
					fadeTransition = {
						transitionEnter: false,
						transitionLeave: false,
						transitionName: "fade",
						transitionAppear: true,
						transitionAppearTimeout: 2500
					};
		return !_.isEmpty(this.props.activePoll) ? (
			<div>
				<Chart
					title={this.props.activePoll.title}
					options={this.props.activePoll.options}
					totalVotes={this.props.activePoll.totalVotes}
					id={this.props.activePoll.id}
					isLoading={this.props.isLoading}
					processVote={this.processVote}
					alreadyVoted={alreadyVoted} 
					fadeTransition={fadeTransition}
				/>
				<AddOption
					handleDelete={this.handleDelete}
					loggedIn={this.props.user.loggedIn}
					title={this.props.activePoll.title}
					createdByActiveUser={this.props.activePoll.createdBy === this.props.user.id} 
					isLoading={this.props.isLoading}
					addOption={this.addOption}
					errorMessage={this.props.errorMessage}
					activePoll={this.props.activePoll}
					alreadyVoted={alreadyVoted}
					fadeTransition={fadeTransition}
				/>
			</div>
		) : <div className='large-loading'>
					<i className="fa fa-spinner fa-5x loading" aria-hidden="true"></i>
				</div>



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
			voteOnPoll: (pollId, votedFor, newOption, token, userIp) => { dispatch(voteOnPoll(pollId, votedFor, newOption, token, userIp)) },
			getPoll: (pollId) => { dispatch(getPoll(pollId)) },
			resetSuccess: () => { dispatch(resetSuccess()) }
		}
	}

PollContainer = withRouter(PollContainer);

export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
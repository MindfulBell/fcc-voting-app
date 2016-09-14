// Home page
// Nav
// Title
// List of Polls (flexbox?)
// Footer?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls, setActivePoll } from '../actions/index';

import PollLink from './poll-link';

class HomeIndex extends Component {
	constructor(props) {
		super(props);

		this.setActivePoll = this.setActivePoll.bind(this);
	}	

	componentWillMount() {
		// get all the polls for the main page
		this.props.getPolls();
	}

	setActivePoll(id) {
		// dispatches active poll action to redux
		this.props.setActivePoll(id);
	}

	render() {
		// HOW DO I SET UP THE /POLL/:POLLID Route? I can't get params working...
		const polls = this.props.pollsList.map((poll, ind) => {
			return (
				<PollLink
				setActivePoll={this.setActivePoll}
				title={poll.title} 
				id={poll.id} 
				key={ind} />
			)
		})

		return (
			<div>
			<h1> I AM HOME </h1>
				<div className='poll-list'>
					{polls}
				</div>
			</div>
		)
	}
}


// REDUX 

const mapStateToProps = (state) => {
	return {
		pollsList: state.polls.pollsList
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			getPolls: () => {dispatch(getPolls())},
			setActivePoll: (id) => {dispatch(setActivePoll(id))}
		}
	}


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
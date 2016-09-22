// Home page
// Nav
// Title
// List of Polls (flexbox?)
// Footer?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls, setActivePoll, clearPolls } from '../actions/index';
import { Link } from 'react-router';

import PollLink from './poll-link';

class HomeIndex extends Component {
	constructor(props) {
		super(props);
	}	

	componentWillMount() {
		this.props.getPolls();
	}

	componentWillUnmount() {
		this.props.clearPolls();
	}
	render() {

		const polls = this.props.pollsList.map((poll, ind) => {
			return (
				<PollLink
				className='poll-link'
				title={poll.title} 
				id={poll.id} 
				key={ind} />
			)
		})

		return (
			<div className='home-main'>
				<h1 className='title'> Counts </h1>
				<h3 className='subtitle'> <i>Vote for what you believe in...</i> </h3>
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
		pollsList: state.polls.pollsList,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			getPolls: () => {dispatch(getPolls())},
			clearPolls: () => {dispatch(clearPolls())}
		}
	}


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
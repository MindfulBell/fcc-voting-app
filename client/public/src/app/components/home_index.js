// Home page
// Nav
// Title
// List of Polls (flexbox?)
// Footer?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls, setActivePoll } from '../actions/index';
import { Link } from 'react-router';

import PollLink from './poll-link';

class HomeIndex extends Component {
	constructor(props) {
		super(props);
	}	

	componentWillMount() {
		// get all the polls for the main page
		this.props.getPolls();
	}

	render() {
		const polls = this.props.pollsList.map((poll, ind) => {
			return (
				<PollLink
				title={poll.title} 
				id={poll.id} 
				key={ind} />
			)
		})

		return (
			<div>
				<div className='navbar'>
					<ul>
						<Link to='/user/login'>
							<li> Login </li>
						</Link>
						<Link to='/user/new'>
							<li> Register </li>
						</Link>
						<li> My Polls </li>
					</ul>
				</div>
				<div>
				<h1> Home Page </h1>
					<div className='poll-list'>
						{polls}
					</div>
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
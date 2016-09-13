// Home page
// Nav
// Title
// List of Polls (flexbox?)
// Footer?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls } from '../actions/index';

import PollLink from './poll-link';

class HomeIndex extends Component {
	constructor(props) {
		super(props);
	}	

	componentWillMount() {
		this.props.getPolls();
	}

	render() {
		const polls = this.props.pollsList.map((poll, ind) => {
			return <PollLink title={poll.title} id={poll.id} key={ind}/>
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
			getPolls: () => {dispatch(getPolls())}
		}
	}


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
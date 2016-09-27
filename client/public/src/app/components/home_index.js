import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls, setActivePoll, clearPolls } from '../actions/index';
import PollList from './poll-list';


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

		return (
			<div className='main'>
				<h1 className='title'> Counts </h1>
				<h3 className='subtitle'> <i>Vote for what you believe in...</i> </h3>
				<PollList pollsList={this.props.pollsList} />
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
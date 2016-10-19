import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserPolls, clearPolls } from '../actions/index';
import PollsList from '../components/poll-list';

class ProfileContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getUserPolls(this.props.params.userId, this.props.token)
	}

	componentWillUnmount() {
		this.props.clearPolls();
	}

	render() {
		return (
			<div className='main'>
				<h1 className='title'> Your polls </h1>
				<h3 className='subtitle'> <i>What will you ask today?</i> </h3>
				<PollsList pollsList={this.props.pollsList} />
			</div>
		)
	}
}

// REDUX

const mapStateToProps = (state) => {
	return {
		token: state.user.auth.token,
		pollsList: state.polls.pollsList
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
		getUserPolls: (userId, token) => {dispatch(getUserPolls(userId, token))},
		clearPolls: () => {dispatch(clearPolls())}
	}
}

//WEIRD BUG HERE...

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
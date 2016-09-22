import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getUserPolls } from '../actions/index';
import PollLink from '../components/poll-link';

class ProfileContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		console.log(this.props.token);
		this.props.getUserPolls(this.props.params.userId, this.props.token)
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
		});
		return (
			<div> 
				{polls}
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
		getUserPolls: (userId, token) => {dispatch(getUserPolls(userId, token))}
	}
}

//WEIRD BUG HERE...

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
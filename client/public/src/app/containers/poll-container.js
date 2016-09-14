import React, { Component } from 'react';
import { connect } from 'react-redux';

import Poll from '../components/poll';
import { setActivePoll } from '../actions/index';

class PollContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		// Set the active poll based on the params above...it works...but not getting the info in time to render it...
		this.props.setActivePoll(this.props.params.pollId);
		console.log('active', this.props.activePoll);
	}

	render() {
		return(
			<Poll 
				title={this.props.activePoll.title}
				createdBy={this.props.activePoll.createdBy}
				options={this.props.activePoll.options}
				totalVotes={this.props.activePoll.totalVotes}
			/>
		)
	}
}
// REDUX 

const mapStateToProps = (state) => {

	return {
		activePoll: state.activePoll
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			setActivePoll: (id) => {dispatch(setActivePoll(id))}
		}
	}


export default connect(mapStateToProps, mapDispatchToProps)(PollContainer);
// Home page
// Nav
// Title
// List of Polls (flexbox?)
// Footer?

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls } from '../actions/index';

class HomeIndex extends Component {
	constructor(props) {
		super(props);
	}	

	componentWillMount() {
		this.props.getPolls();
	}

	render() {
		return (
			<h1> I AM HOME </h1>
		)
	}
}


// REDUX 

const mapStateToProps = (state) => {
	return {
		polls: state.polls
	}
}

const mapDispatchToProps = (dispatch) => { 
	return {
			getPolls: () => {dispatch(getPolls())}
		}
	}


export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
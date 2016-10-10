import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls, setActivePoll, clearPolls } from '../actions/index';
import PollList from './poll-list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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

		const titleAndNTransition = {
			transitionAppear: true,
			transitionAppearTimeout: 2500,
			transitionEnter: false,
			transitionLeave: false
		};
		const subtitleTransition = {
			transitionName: 'slideUp',
			transitionAppear: true,
			transitionAppearTimeout: 4000,
			transitionEnter: false,
			transitionLeave: false
		};

		return (
			<div className='main'>
				<div className='jumbotron'>
					<ReactCSSTransitionGroup transitionName="fade" {...titleAndNTransition}>
						<h1 className='title'> Cou
						<ReactCSSTransitionGroup transitionName="slide" {...titleAndNTransition}>
							<span className='n'>n</span>
						</ReactCSSTransitionGroup>
						ts </h1>
					</ReactCSSTransitionGroup>
					<ReactCSSTransitionGroup {...subtitleTransition}>
						<h3 className='subtitle'> Choose Wisely... </h3>
					</ReactCSSTransitionGroup>
				</div>
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
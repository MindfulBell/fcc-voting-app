import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPolls, setActivePoll, clearPolls } from '../actions/index';
import PollList from './poll-list';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class HomeIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			y: 0,
			scrolled: false
		}
		this.handleScroll = this.handleScroll.bind(this);
	}	


	componentWillMount() {
		window.addEventListener('scroll', this.handleScroll);
	}
	componentDidMount() {
		this.props.getPolls();
	}

	componentWillUnmount() {
		this.props.clearPolls();
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll() {
		const y = window.pageYOffset;
		if (y > 100 && !this.state.scrolled) {
			this.setState({scrolled: true})
		}
		this.setState({y});
	}

	render() {
		const titleAndNTransition = {
			transitionAppear: true,
			transitionAppearTimeout: 2500,
			transitionEnter: false,
			transitionLeave: false
		},
		subtitleTransition = {
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
					<ReactCSSTransitionGroup transitionName="fade" {...titleAndNTransition} >
						<div>
							<i 
								className="fa fa-arrow-down fa-3x" 
								aria-hidden="true"
								style={this.state.y > 100 || this.state.scrolled ? {opacity: 0} : {}}></i>
						</div>
					</ReactCSSTransitionGroup>
				</div>
				<PollList pollsList={this.props.pollsList} y={this.state.y}/>
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
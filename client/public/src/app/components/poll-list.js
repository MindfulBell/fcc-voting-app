import React, { Component } from 'react';
import PollLink from './poll-link';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class PollList extends Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.y === this.props.y
	}
	render() {
		const appearTransition = {
			transitionName: "fade",
			transitionLeave: false,
			transitionEnter: false,
			transitionAppear: true,
			transitionAppearTimeout: 2500
		};

		let polls;
		if (this.props.pollsList) {
			polls = this.props.pollsList.map((poll, ind) => {
				return (
						<PollLink
						className='poll-link'
						title={poll.title} 
						index={ind}
						id={poll.id} 
						key={ind}
						/>
				)
			});
		}
		return (
			<div className='poll-list'>
				{this.props.pollsList.length > 0 ? polls : null}
			</div>
		)
	}
}

import React from 'react';
import PollLink from './poll-link';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default (props) => {
	const appearTransition = {
		transitionName: "fade",
		transitionLeave: false,
		transitionEnter: false,
		transitionAppear: true,
		transitionAppearTimeout: 2500
	};

	let polls;
	if (props.pollsList) {
		polls = props.pollsList.map((poll, ind) => {
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
			{props.pollsList.length > 0 ? polls : null}
		</div>
	)
}
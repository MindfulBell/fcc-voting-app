import React from 'react';
import PollLink from './poll-link';

export default (props) => {
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
	else {
		polls = <i className="fa fa-spinner fa-5x loading" aria-hidden="true"></i>
	}
	return (
		<div className='poll-list'>
			{polls}
		</div>
	)
}
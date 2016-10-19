import React from 'react';
import { Link } from 'react-router';

export default (props) => {
	const animationStyle = {
		"animationName": 'slideUp',
		"animationDuration": '2500ms',
		"animationIterationCount": '1',
		"animationDelay": `${props.index * 100}ms`
	};
	return (
		<Link to={`/poll/${props.id}`}>
			<div className='poll-link'>
				<h3>{props.title}</h3>
			</div>
		</Link>
	)
}
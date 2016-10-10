import React from 'react';
import { Link } from 'react-router';

export default (props) => {
	let animation = `appear ${props.index%4 + .5}s ease-out  1`;
	return (
		<Link to={`/poll/${props.id}`}>
			<div className='poll-link' style={{animation}}>
				<h3>{props.title}</h3>
			</div>
		</Link>
	)
}
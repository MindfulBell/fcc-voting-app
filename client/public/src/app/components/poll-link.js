import React from 'react';
import { Link } from 'react-router';

export default (props) => {
	return (
		<Link to={`/poll/${props.id}`}>
			<div className='poll-link'>
				<h3>{props.title}</h3>
			</div>
		</Link>
	)
}
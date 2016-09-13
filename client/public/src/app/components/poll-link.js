import React from 'react';
import { Link } from 'react-router';

export default (props) => {
	return (
		<Link to='/poll'>
			<div className='poll-link' data-id={props.id}>
				<h3>{props.title}</h3>
			</div>
		</Link>
	)
}
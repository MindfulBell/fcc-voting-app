import React from 'react';
import { Link } from 'react-router';

export default (props) => {
	let backgroundColor ;
	(() => { 
		switch (props.index%4) {
			case 0:
				backgroundColor = '#9BD1E5';
				break;
			case 1: 
				backgroundColor = '#6A8EAE';
				break;
			case 2: 
				backgroundColor = '#157145';
				break;
			default:
				backgroundColor = '#57A773';
				break;
		}
	})();
	let animation = `appear ${props.index%4 + .5}s ease-out  1`;
	return (
		<Link to={`/poll/${props.id}`}>
			<div className='poll-link' style={{backgroundColor, animation}}>
				<h3>{props.title}</h3>
			</div>
		</Link>
	)
}
import React from 'react';
import { Link } from 'react-router';

export default (props) => {
	const randRGB = () => Math.floor(Math.random()*(256-1)) + 1,
		    color = `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;
	return (
		<Link to={`/poll/${props.id}`}>
			<div className='poll-link'>
				<div className='pie'>
					<i className="fa fa-pie-chart fa-5x" style={{color}} aria-hidden="true"></i>
				</div>
				<div className='poll-name'>
					<h3>{props.title}</h3>
				</div>
			</div>
		</Link>
	)
}
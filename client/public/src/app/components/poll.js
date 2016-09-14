import React from 'react';

// presentational dumb component that will get its data from poll-container
export default (props) => {
	return (
		<div>
			<h2>{props.title}</h2>
			<h3>By: {props.createdBy}</h3>
			<h4>{props.options}</h4>
		</div>
	)
}
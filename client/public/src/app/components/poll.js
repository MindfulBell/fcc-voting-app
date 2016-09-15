import React from 'react';

// presentational dumb component that will get its data from poll-container
export default (props) => {
	let options;
	if (props.options) {
		options = props.options.map((option, ind)=>{
			return (
			<div key={ind}>
				<button 
					onClick={(e) => {props.processVote(props.id, option.optionName)}} 
					key={ind}>
					{option.optionName}
				</button>
				<div key={ind + 1}> {option.votes} </div>
			</div>
			)
		});
	}

	return (
		<div>
			<h2>{props.title}</h2>
			{options}
		</div>
	)
}
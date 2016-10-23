import React from 'react';
import Chart, { Pie } from 'react-chartjs-2';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default (props) => {
	let	choices = [],
		  labels = [],
		  votes = [],
		  backgroundColor = [];

	if (props.options) {
		props.options.forEach((option, ind, arr)=>{

			const randRGB = () => Math.floor(Math.random()*(256-1)) + 1;
			let color = `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;
			backgroundColor.push(color)

			labels.push(option.optionName);
			votes.push(option.votes);

			choices.push(
			<button key={ind}
				className='choice'
				onClick={(e) => {props.processVote(props.id, option.optionName)}} 
				key={ind}>
				{option.optionName}
			</button>
			)
		});
	}
	const chartData = {
			labels,
			datasets: [{
				label: '# of Votes',
				data: votes,
				backgroundColor,
        borderWidth: 2 
			}]
		},
		fadeTransition = {
	  	transitionEnterTimeout: 2500,
	  	transitionName: 'fade',
	  	transitionLeave: false
	  };

	return (
		<ReactCSSTransitionGroup {...props.fadeTransition}>
			<div className='chart-holder'>
				<h2 className='title'>{props.title}</h2>
				<Pie data={chartData} width={400} height={400} options={{
					responsive: true
				}}/>
				{ props.alreadyVoted ? null :	
					<div key='test' className='choices-container'>
						{choices}
					</div>
				}
			</div>
		</ReactCSSTransitionGroup>
	)
}
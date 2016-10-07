import React from 'react';
import Chart, { Pie } from 'react-chartjs-2';


export default (props) => {
	let tweet = `Come vote on my sweet poll! ${props.title} ${window.location.href}`,
			twitterLink = `https://twitter.com/intent/tweet?text=${tweet}`,
			choices = [],
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
	let chartData = {
			labels,
			datasets: [{
				label: '# of Votes',
				data: votes,
				backgroundColor,
        borderWidth: 2 
			}]
		}

	function addOption(e) {
		e.preventDefault();
		props.addOption();
	}

	function handleDelete() {
		props.handleDelete();
	}

	let activeUserOptions = 
		<div className='active-user-options'>
			<a className="twitter-share-button" 
				 href={twitterLink} 
				 target="#blank">
				Tweet 
			</a>
			<div className='delete' onClick={handleDelete}> 
				Delete This Poll 
			</div>
		</div>

	return (
		<div className='chart-holder'>
			<h2 className='title'>{props.title}</h2>
			<Pie data={chartData} width={400} height={400} options={{
				responsive: true
			}}/>
			<div className='choices-container'>
				{choices}
				{ props.loggedIn ? 
					<form className='new-option-form' onSubmit={(e) => {addOption(e)}}> 
						<input type='text' 
							placeholder='New Option' 
							value={props.value}
							onChange={(e) => {props.updateValue(e.target.value)}}
						/>
						<button type='submit'> Add Option and Vote </button>
					</form> :
					<div> Don't like the choices? Login to create a new option! </div> 
				}
			</div>
			{ props.createdByActiveUser ? activeUserOptions :	null }
		</div>
	)
}
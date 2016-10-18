import React, { Component } from 'react';
import Chart, { Pie } from 'react-chartjs-2';
import { Link } from 'react-router';

class Poll extends Component {
	constructor(props) {
		super(props);
		this.state = {
			backgroundColor: [],
			labels: [],
			votes: [],
			choices: []
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.addOption = this.addOption.bind(this);
	}

	componentWillMount(){
		let backgroundColor = [],
				labels = [],
				votes = [],
				choices = [];

		if (this.props.options) {
			this.props.options.forEach((option, ind, arr) =>	{
				const randRGB = () => Math.floor(Math.random()*(256-1)) + 1;
				let color = `rgb(${randRGB()}, ${randRGB()}, ${randRGB()})`;
				backgroundColor.push(color)

				labels.push(option.optionName);
				votes.push(option.votes);

				choices.push(
				<button key={ind}
					className='choice'
					onClick={(e) => {this.props.processVote(this.props.id, option.optionName)}} 
					key={ind}>
					{option.optionName}
				</button>
				)
			});	
		}
		this.setState({
			backgroundColor,
			labels,
			votes,
			choices
		});
	}
	addOption(e) {
		e.preventDefault();
		this.props.addOption();
	}

	handleDelete() {
		this.props.handleDelete();
	}
	render() {
		console.log(this.state);
		const tweet = `Come vote on my sweet poll! ${this.props.title} ${window.location.href}`,
			    twitterLink = `https://twitter.com/intent/tweet?text=${tweet}`,
		 			{ labels, votes, backgroundColor } = this.state;
		let chartData = {
			labels,
			datasets: [{
				label: '# of Votes',
				data: votes,
				backgroundColor,
        borderWidth: 2 
			}]
		}
		let activeUserOptions = 
			<div className='active-user-options'>
				<a className="twitter-share-button" 
					 href={twitterLink} 
					 target="#blank">
					Tweet 
				</a>
					{
						this.props.isLoading ? 
						<i className="fa fa-spinner fa-2x loading" aria-hidden="true">
						</i>
						:
						<div className='delete' onClick={this.handleDelete}> 
							Delete this poll!
						</div>
					}
				<div className='message'>
					{
						this.props.errorMessage ? <span>{this.props.errorMessage}</span> : null
					}
				</div>
			</div>

		return (
			<div className='chart-holder'>
				<h2 className='title'>{this.props.title}</h2>
				<Pie data={chartData} width={400} height={400} options={{
					responsive: true
				}}/>
				<div className='choices-container'>
					{this.state.choices}
				</div>
				<div className='add-option-container'>
					{ this.props.loggedIn ? 
						<form className='new-option-form' onSubmit={(e) => {this.addOption(e)}}> 
							<input 
								className='form-input'
								type='text' 
								placeholder='New option...' 
								value={this.props.value}
								onChange={(e) => {this.props.updateValue(e.target.value)}}
							/>
							<button type='submit'> Add option and vote </button>
						</form> :
						<div> Don't like the choices? <Link to={`/user/login`}><span className='login-link'>Login</span></Link> to create a new option! </div> 
					}
				</div>
				{ this.props.createdByActiveUser ? activeUserOptions :	null }
			</div>
		)

	}
}

export default Poll;
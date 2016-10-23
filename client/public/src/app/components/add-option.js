import React, { Component } from 'react';
import { Link } from 'react-router';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AddOption extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: '',
			emptySubmit: false,
			errorMessage: '' 
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.addOption = this.addOption.bind(this);
		this.updateValue = this.updateValue.bind(this);
		this.checkForRepeats = this.checkForRepeats.bind(this);
	}

componentWillReceiveProps(nextProps) {
	if (nextProps.errorMessage !== '') {
		this.setState({ errorMessage: nextProps.errorMessage })
	}
}

handleDelete() {
	this.props.handleDelete();
}

addOption(e) {
	e.preventDefault();
	if (this.checkForRepeats(this.state.value, this.props.activePoll.options)) {
		this.setState({
			errorMessage: 'Option already exists!'
		})
	}
	else if (this.state.value === '') {
		this.setState({ emptySubmit: true })
	}
	else {
		this.props.addOption(this.state.value);
		this.setState({value: '', errorMessage: ''});	
	}
}

updateValue(value) {
	this.setState({
		value,
		emptySubmit: false
	});
}

checkForRepeats(value, arr) {
	const lowerCaseArr = arr.map((val) => val.optionName.toString().toLowerCase())
	return lowerCaseArr.includes(value.toLowerCase());
}
					
render() {
	
	const tweet = `Come vote on my sweet poll! ${this.props.title} ${window.location.href}`,
				twitterLink = `https://twitter.com/intent/tweet?text=${tweet}`,
				activeUserOptions = 
			<div className='active-user-options'>
				<div className='twitter-share-button'>
					<a href={twitterLink} 
						 target="#blank">
						<i className="fa fa-twitter fa-3x" aria-hidden="true"></i> 
					</a>
				</div>
					{
						this.props.isLoading ? 
						<i className="fa fa-spinner fa-2x loading" aria-hidden="true">
						</i>
						:
						<div className='delete button' onClick={this.handleDelete}> 
							<i className="fa fa-times fa-3x" aria-hidden="true"></i>
						</div>
					}
			</div>;

	return (

		<div>
			{ this.props.alreadyVoted ? 
				<ReactCSSTransitionGroup {...this.props.fadeTransition}>
					<div className='already-voted'>
						Thanks for Voting!
					</div>
				</ReactCSSTransitionGroup>
				: 
				<div className='add-option-container'>
					{ this.props.loggedIn ? 
						<div>
						<h4> Add an option! </h4>
						<form className='new-option-form' onSubmit={(e) => {this.addOption(e)}}> 
							<input 
								className={this.state.emptySubmit ? 'form-input danger' : 'form-input'}
								type='text' 
								placeholder='New option...' 
								value={this.state.value}
								onChange={(e) => {this.updateValue(e.target.value)}}
							/>
							<button type='submit'> Add option and vote </button>
						</form>
						</div> :
						<div className='not-loggedIn-message'> Don't like the choices? <Link to={`/user/login`}><span className='login-link'>Login</span></Link> to create a new option! </div> 
					}
					<div className='message'>
						{
							this.state.errorMessage.length > 0 ? 
								<span>
									{this.state.errorMessage}
								</span> 
								: " "
						}
					</div>
				</div>
			}
				{ this.props.createdByActiveUser ? activeUserOptions :	null }
		</div>
	)
	}
}


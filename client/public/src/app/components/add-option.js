import React, { Component } from 'react';
import { Link } from 'react-router';

export default class AddOption extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: ''
		}

		this.handleDelete = this.handleDelete.bind(this);
		this.addOption = this.addOption.bind(this);
		this.updateValue = this.updateValue.bind(this);
	}

handleDelete() {
	this.props.handleDelete();
}

addOption(e) {
	e.preventDefault();
	this.props.addOption(this.state.value);
	this.setState({value: ''})
}

updateValue(value) {
	this.setState({
		value
	});
}
					
render() {
	const tweet = `Come vote on my sweet poll! ${this.props.title} ${window.location.href}`,
		twitterLink = `https://twitter.com/intent/tweet?text=${tweet}`,
		activeUserOptions = 
			<div className='active-user-options'>
				<a className="twitter-share-button" 
					 href={twitterLink} 
					 target="#blank">
					<i className="fa fa-twitter-square fa-4x" aria-hidden="true"></i> 
				</a>
					{
						this.props.isLoading ? 
						<i className="fa fa-spinner fa-2x loading" aria-hidden="true">
						</i>
						:
						<div className='delete button' onClick={this.handleDelete}> 
							Delete this poll!
						</div>
					}
				<div className='message'>
					{
						this.props.errorMessage ? <span>{this.props.errorMessage}</span> : null
					}
				</div>
			</div>;

	return (
		<div>
			<div className='add-option-container'>
				<h4> Add an option! </h4>
					{ this.props.loggedIn ? 
						<form className='new-option-form' onSubmit={(e) => {this.addOption(e)}}> 
							<input 
								className='form-input'
								type='text' 
								placeholder='New option...' 
								value={this.state.value}
								onChange={(e) => {this.updateValue(e.target.value)}}
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


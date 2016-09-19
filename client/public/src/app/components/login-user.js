import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { loginUser } from '../actions/index';
import { connect } from 'react-redux';

class LoginUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			new: false
		}
	}

	componentWillMount() {
		if (window.location.href.includes('new')) {
			// making a new user
			this.setState({ new: true })
		}
	}

	onFormSubmit(params) {
		// if a new user, gotta create it first, otherwise, just login
		console.log(params);
		this.props.loginUser(params, this.state.new);
	}

	render() {
		console.log(this.props.user);
		const { handleSubmit, pristine, submitting } = this.props;
		if (this.props.user.loggedIn) {
				return this.state.new ? 
					<h2> Created account and logged in! </h2> : 
					<h2> Logged in! </h2>;
		}
		else {
			return (
				<div className='login-user'>
					<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
						<h2>{this.state.new ? 'Create an Account' : 'Login'}</h2>
						<div>
							<Field name='username' component={renderField} type='text' label='Username'/>
							{ 
								this.state.new ? <span> Min 6 characters... </span> : null		
							}
						</div>
						<div>
							<Field name='password' component={renderField} type='password' label='Password'/>
							{ this.state.new ? 
								<span> 1 uppercase letter, 1 lowercase letter, 1 number, min 6 characters please... </span> 
								: null	
							}
						</div>
							{ this.props.user.auth.success === false && !this.state.new ? 
									<span> Could not login with provided credentials </span> 
									: null
							}
							{
								this.state.new ? 
								<div>
									<Field name='reEnter' component={renderField} type='password' label='Re-enter password'/>
								</div> 
								: null
							}
						<div>
							<button type='submit' disabled={pristine || submitting}> Submit </button>
						</div>			
					</form>
				</div>
			)
		}
	}
}

// REDUX-FORM 

const renderField = function({ input, label, type, meta: { touched, error } }) {
	return  (
	  <div>
	    <label>{label}</label>
	    <div>
	      <input {...input} placeholder={label} type={type}/>
	      {touched && error && <span>{error}</span>}
	    </div>
	  </div>
	)
}

const validate = (values) => {
	const errors = {};
	if (!values.username) {
		errors.username = 'Enter a username';
	}

	if (!values.password) {
		errors.password = 'Enter a password';
	}

	if (values.password !== values.reEnter) {
		errors.reEnter = 'Passwords don\'t match';
	}
	return errors;
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

LoginUser =  reduxForm({ form: 'LoginUserForm', validate })(LoginUser);

export default connect(mapStateToProps, { loginUser })(LoginUser);
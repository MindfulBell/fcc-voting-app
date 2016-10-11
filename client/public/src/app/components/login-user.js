import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { loginRequest, clearCreateError } from '../actions/index';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

class LoginUser extends Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.user.loggedIn) { 
			this.props.router.push('/'); 
		}
	}

	componentWillUnmount(){
		console.log(this.props.token);
		if (this.props.token) {
			localStorage.setItem('token', this.props.token);			
		}
		this.props.clearCreateError();
	}

	onFormSubmit(params) {
		console.log(params);
		this.props.loginRequest(params, this.props.newUser);
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;

		if (this.props.user.loggedIn) {
				return this.props.newUser ? 
					<h2> Created account and logged in! </h2> : 
					<h2> Logged in! </h2>;
		}
		else {
			return (
				<div className={this.props.newUser ? 'login-user new-user' : 'login-user'}>
					<form className='login-form' onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
						<h2>{this.props.newUser ? 'Create an Account' : 'Login'}</h2>
						<div className='form-element'>
							<Field name='username' component={renderField} type='text' label='Username'/>
						</div>
						<div className='form-element'>
							<Field name='password' component={renderField} type='password' label='Password'/>
						</div>
							{ this.props.user.auth.success === false && !this.props.newUser ? 
									<span className='form-submit-error'> Could not login with provided credentials </span> 
									: null
							}
							{
								this.props.newUser ? 
								<div className='form-element'>
									<Field name='reEnter' component={renderField} type='password' label='Re-enter password'/>
								</div> 
								: null
							}
						<div className='form-element'>
							{ this.props.loader.isLoading ? 
								<i className="fa fa-spinner fa-2x loading" aria-hidden="true"></i>
								: <button type='submit' disabled={pristine || submitting}> <i className="fa fa-check fa-2x" aria-hidden="true"></i> </button>
							}
						</div>
						{ !this.props.newUser ? 
							<span>Don't have an account? 
								<Link to={`/user/new`}>
									<span className='login-link'> Register!</span>
								</Link> 
							</span> : null }
						{this.props.newUser && this.props.user.createError ? 
							<div className='message'>{this.props.user.createError}</div>
							:
							null
						}			
					</form>
				</div>
			)
		}
	}
}

// REDUX-FORM 

const renderField = function({input, label, type, meta: { touched, error } }) {
	return  (
	  <div>
	    <div>
	      <input {...input} placeholder={label} type={type} className='form-input'/>
	      {touched && error && <span className='form-error-message'>{error}</span>}
	    </div>
	  </div>
	)
}

const validate = (values) => {
	const errors = {};
	if (!values.username) {
		errors.username = 'Enter a username!';
	}

	if (values.username && values.username.length < 6) {
		errors.username = 'Min 6 characters!';
	}

	if (!values.password) {
		errors.password = 'Enter a password!';
	}

	if (values.password && (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/g.test(values.password) || values.password.length < 6)) {
		errors.password = '1 upper, 1 lower, 1 num, min 6 characters!';
	}

	if (values.password !== values.reEnter) {
		errors.reEnter = 'Passwords don\'t match';
	}
	return errors;
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		loader: state.loader,
		token: state.user.auth.token
	}
}

LoginUser =  reduxForm({ form: 'LoginUserForm', validate })(LoginUser);

LoginUser = withRouter(LoginUser);

export default connect(mapStateToProps, { loginRequest, clearCreateError })(LoginUser);
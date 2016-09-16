import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { processUserLogin } from '../actions/index';
import { connect } from 'react-redux';

class LoginUser extends Component {
	constructor(props) {
		super(props);
	}

	onFormSubmit(params) {
		console.log('yo')
		this.props.processUserLogin(params);
	}

	render() {
		const { handleSubmit, pristine, submitting } = this.props;
		if (this.props.user.loggedIn) {
				return <h1> LOGGED IN SUCCESSFULLY </h1>
		}
		else {
			return (
				<div className='login-user user-modal'>
					<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
						<h2> Login </h2>
						<div>
							<label htmlFor='username'>Username: </label>
							<Field name='username' component='input' type='text' placeholder='Username'/>
						</div>
						<div>
							<label htmlFor='password'>Password: </label>
							<Field name='password' component='input' type='password' placeholder='Password'/>
						</div>
						<div>
							<button type='submit' disabled={pristine || submitting}> Submit </button>
						</div>			
					</form>
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

LoginUser =  reduxForm({ form: 'LoginUserForm' })(LoginUser);

export default connect(mapStateToProps, { processUserLogin })(LoginUser);
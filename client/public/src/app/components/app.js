import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import { loginFromStorage, logoutUser } from '../actions/index';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.logoutUser = this.logoutUser.bind(this);
	}

	componentWillMount() {  
		if (localStorage.getItem('token')) {
			const token = localStorage.getItem('token');
			console.log(token);
			this.props.loginFromStorage(token);
		}
	}

	logoutUser() {
		this.props.logoutUser();
		localStorage.removeItem('token');
		browserHistory.push('/');
	}

	render() {
		const loggedInNav = 
			<div className='right-links'>
				<Link to={`/user/${this.props.user.id}`}>
					<li className='link'> My Polls </li>
				</Link>
				<li className='link' onClick={this.logoutUser}>	Logout </li>
				<li className='link greeting'> Hi, {this.props.user.username} </li>
			</div>

		return (
			<div>
				<div className='navbar-container'>
					<ul className='navbar'>
						<Link to='/'>
							<li className='link link-icon' id='home'> <i className="fa fa-home fa-2x" aria-hidden="true"> </i> </li>
						</Link>
					{ this.props.user.loggedIn ? 
								loggedInNav :
						<div className='right-links'> 
							<Link to='/user/login'>
								<li className='link'> Login </li>
							</Link>
							<Link to='/user/new'>
								<li className='link'> Register </li>
							</Link>
						</div>
						}
					</ul>
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loginFromStorage: (token) => { dispatch(loginFromStorage(token)) },
		logoutUser: () => { dispatch(logoutUser()) }
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(App); 
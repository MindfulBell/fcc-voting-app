import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { loginFromStorage, logoutUser } from '../actions/index';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.logoutUser = this.logoutUser.bind(this);
	}

	componentDidMount() {  
		console.log('Attempting Login')
		if (localStorage.hasOwnProperty('token') && localStorage.getItem('token') !== 'undefined') {
			const token = localStorage.getItem('token');
			this.props.loginFromStorage(token);
		}
	}

	logoutUser() {
		this.props.logoutUser();
		localStorage.removeItem('token');
		this.props.router.push('/');
	}

	render() {
		const loggedInNav = 
			<div className='right-links'>
				<Link to={`/user/${this.props.user.id}`}>
					<li className='link link-icon'> <i className="fa fa-cogs fa-2x" aria-hidden="true"></i> </li>
				</Link>
				<Link to={`/polls/new`}>
					<li className='link link-icon'> <i className="fa fa-pencil fa-2x" aria-hidden="true"></i> </li>
				</Link>
				<li className='link' onClick={this.logoutUser}>	<i className="fa fa-sign-out fa-2x" aria-hidden="true"></i> </li>
				<li className='link greeting'> Hi, {this.props.user.username} </li>
			</div>

		return (
			<div>
				<div className='navbar-container'>
					<ul className='navbar'>
						<Link to='/'>
							<li className='link link-icon' id="home"> <i className="fa fa-home fa-2x" aria-hidden="true"> </i> </li>
						</Link>
					{ this.props.user.loggedIn ? 
								loggedInNav :
						<div className='right-links'> 
							<Link to='/user/login'>
								<li className='link link-icon'> <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i> </li>
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

App = withRouter(App);

export default connect(mapStateToProps, mapDispatchToProps)(App); 
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

// CHANGE LINK TO ACCOUNT TO HAVE USERID AS PARAM
	render() {
		const loggedInNav = 
			<div className='right-links'>
				<Link to={`/user/${this.props.user.id}`}>
					<li className='link'> My Polls </li>
				</Link>
				<li className='link'>	Logout </li>
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
export default connect(mapStateToProps, null)(App); 
import React, { Component } from 'react';
import UserLogin from '../components/login-user';

class UserContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log(this.props);
        return (
        	<div>
        		<UserLogin newUser={this.props.route.newUser} />
        	</div>
       )
    }
}

export default UserContainer;

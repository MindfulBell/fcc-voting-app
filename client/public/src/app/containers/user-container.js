import React, { Component } from 'react';
import UserLogin from '../components/login-user';

class UserContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        	<div>
        		<UserLogin />
        	</div>
       )
    }
}

export default UserContainer;

import React, { Component } from 'react';
import UserLogin from '../containers/login-user';

class UserContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let pollId = false;
        if (this.props.location.state !== null) {
            pollId = this.props.location.state.pollId;
        }
        return (
        	<div>
        		<UserLogin newUser={this.props.route.newUser} pollId={pollId}/>
        	</div>
       )
    }
}

export default UserContainer;

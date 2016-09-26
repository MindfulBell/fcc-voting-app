import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import HomeIndex from './components/home_index';
import PollContainer from './containers/poll-container';
import UserContainer from './containers/user-container';
import ProfileContainer from './containers/profile-container';
import NewPollForm from './containers/newPoll-container';

export default(
	<Route path='/' component={App}> 
		<IndexRoute component={HomeIndex} />
		<Route path='/poll/:pollId' component={PollContainer} />
		<Route path='/user/new' newUser={true} component={UserContainer} />
		<Route path='/user/login' component={UserContainer} />
		<Route path='/user/:userId' component={ProfileContainer} />
		<Route path='/polls/new' component={NewPollForm} />
	</Route>
)

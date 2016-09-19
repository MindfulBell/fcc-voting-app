import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import HomeIndex from './components/home_index';
import PollContainer from './containers/poll-container';
import UserContainer from './containers/user-container';

export default(
	<Route path='/' component={App}> 
		<IndexRoute component={HomeIndex} />
		<Route path='/poll/:pollId' component={PollContainer} />
		<Route path='/user/new' component={UserContainer} />
		<Route path='/user/login' component={UserContainer} />
	</Route>
)

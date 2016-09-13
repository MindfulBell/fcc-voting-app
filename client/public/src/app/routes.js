import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import HomeIndex from './components/home_index';

const test = () => {
	return <h1>TEST TEST TEST </h1>;
}

export default(
	<Route path='/' component={App}> 
		<IndexRoute component={HomeIndex} />
		<Route path='/poll' component={test} />
	</Route>
)

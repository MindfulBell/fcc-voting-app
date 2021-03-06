if (process.env.NODE_ENV !== 'production') {
	require("!style!css!sass!../css/main.scss");
}

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import createRoutes from './routes';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';

const routingMiddleware = routerMiddleware(browserHistory);
const store = createStore(reducers, applyMiddleware(promise, thunk, routingMiddleware))
const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<Router history={history} routes={createRoutes(store)} />
	</Provider>, document.getElementById('app')
);
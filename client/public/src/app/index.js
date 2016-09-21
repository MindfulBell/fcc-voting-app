import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import routes from './routes';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
require("!style!css!sass!../css/main.scss");

const storeWithMiddleware = applyMiddleware(promise, thunk)(createStore);

render(
	<Provider store={storeWithMiddleware(reducers)}>
		<Router history={browserHistory} routes={routes} />
	</Provider>, document.getElementById('app')
);
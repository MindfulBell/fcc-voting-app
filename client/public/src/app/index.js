import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1> Hello BACON asdf FOR IT! </h1>
			</div>
		)
	}
}

render(<App/>, document.getElementById('app'));
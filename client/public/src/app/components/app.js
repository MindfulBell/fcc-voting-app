import React, { Component } from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1> Hello BACON asdf FOR IT! </h1>
				{this.props.children}
			</div>
		)
	}
}

export default App; 
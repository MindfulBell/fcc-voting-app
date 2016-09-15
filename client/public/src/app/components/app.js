import React, { Component } from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<h1> Welcome to my awesome Voting App! </h1>
				{this.props.children}
			</div>
		)
	}
}

export default App; 
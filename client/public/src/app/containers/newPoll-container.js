import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { createNewPoll, newPollReset } from '../actions/index';

class NewPollForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fields: 2,
			validateError: false
		}
		this.addOptionField = this.addOptionField.bind(this);
		this.submitPoll = this.submitPoll.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (!_.isEmpty(nextProps.polls.activePoll)) {
			this.props.router.push(`/poll/${nextProps.polls.activePoll.id}`)
		}
	}

	addOptionField() {
		this.setState({
			fields: this.state.options + 1
		})
	}

	submitPoll(params) {
		let options = [],
				optionNames = [];
		for (let key in params) {
			if (key !== 'title' && params[key] !== undefined) {
				if (optionNames.includes(params[key])) {
					this.setState({
						validateError: "Cannot have repeat choices!"
					})
					return;
				}
				options.push({optionName: params[key], votes: 0});
				optionNames.push(params[key]);
			}
		}
		if (!params.title || options.length < 2) {
			this.setState({
				validateError: "Please add a title and at least 2 options"
			})
			return;
		}
		const newPoll = { 
			poll: { 
				title: params.title, 
				createdBy: this.props.user.id, 
				options,
				IPsVoted: []
			}, 
			token: this.props.user.auth.token
		};
		this.props.createNewPoll(newPoll);
		this.setState({
			validateError: false
		})
	}

	render() {
	const { handleSubmit, polls, loader } = this.props;
	let fields = [];
	for (let i=1; i <= this.state.fields; i++) {
		fields.push(
			<Field key={i} className='form-input'name={`${i}`} component='input' type='text' placeholder={`Option #${i}`}/>
		)
	}
		return (
			<div className='main new-poll'>
			<h1 className='title'> Crea<span className='t'>t</span>e a <span className='p'>P</span>oll </h1>
			<h2 className='subtitle'> What will you ask today? </h2>
				<div className='new-poll-form'>
					<form onSubmit={handleSubmit(this.submitPoll)}>
						<Field className='form-input poll-title' name='title' component='input' type='text' placeholder='Title'/>
						<div className='new-options-container'>
							{fields}
						</div>
						<div className='add-option' onClick={this.addOptionField}><i className="fa fa-plus fa-2x" aria-hidden="true"></i></div>
						{ loader.isLoading ? 
							<i className="fa fa-spinner fa-2x loading" aria-hidden="true"></i>
							: <button type='submit'> <i className="fa fa-check fa-2x" aria-hidden="true"></i> </button>
						}
						<div className='message danger'>
							{ this.state.validateError ? <span>{this.state.validateError}</span> : null}
						</div>
					</form>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		loader: state.loader,
		polls: state.polls,
		errorMessage: state.polls.pollErrorMessage
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createNewPoll: () => { dispatch(createNewPoll(newPoll)) },
		newPollReset: () => { dispatch(newPollReset()) }
	}
}

NewPollForm = reduxForm({
	form: 'newPoll'
})(NewPollForm);

NewPollForm = withRouter(NewPollForm);

export default connect(mapStateToProps, { createNewPoll })(NewPollForm)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { withRouter } from 'react-router';

import { createNewPoll, createdPoll } from '../actions/index';

class NewPollForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			options: 2
		}
		this.addOptionField = this.addOptionField.bind(this);
		this.submitPoll = this.submitPoll.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.polls.createdPoll) {
			this.props.router.push(`/poll/${nextProps.polls.activePoll._id}`)
		}
	}

	addOptionField() {
		this.setState({
			options: this.state.options + 1
		})
	}

	submitPoll(params) {
		let options = [];
		for (let key in params) {
			if (key !== 'title') {
				options.push({optionName: params[key], votes: 0})
			}
		}
		const newPoll = { 
			poll: { 
				title: params.title, 
				createdBy: this.props.user.id, 
				options
			}, 
			token: this.props.user.auth.token
		};
		this.props.createNewPoll(newPoll);
	}

	render() {
	const { handleSubmit, pristine, submitting, polls, loader } = this.props;
	let options = [];
	for (let i=1; i<=this.state.options; i++) {
		options.push(
			<div className='poll-form-option' key={i}>
				<label htmlFor={`${i}`}> Option #{`${i}`}</label>
				<Field name={`${i}`} component='input' type='text'/>
			</div>
		)
	}
		return (
			<div className='main'>
				<form onSubmit={handleSubmit(this.submitPoll)}>
					<div className='poll-form-title'>
						<label htmlFor='title'> Name Your Poll... </label>
						<Field name='title' component='input' type='text'/>
					</div>
					{options}
					<div className='button' onClick={this.addOptionField}>Add option...</div>
					{ loader.isLoading ? 
						<i className="fa fa-spinner fa-2x loading" aria-hidden="true"></i>
						: <button type='submit' disabled={pristine || submitting}> Submit Poll </button>
					}
				</form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		loader: state.loader,
		polls: state.polls
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		createNewPoll: () => { dispatch(createNewPoll(newPoll))}
	}
}

NewPollForm = reduxForm({
	form: 'newPoll'
})(NewPollForm);

NewPollForm = withRouter(NewPollForm);

export default connect(mapStateToProps, { createNewPoll })(NewPollForm)
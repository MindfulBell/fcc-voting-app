import axios from 'axios';
import makeAxiosRequest from '../helpers/axios-helper';

const ROOT_API = 'http://127.0.0.1:3000/api';
const POLL_API = '/polls';
const USER_API = '/user';

export const GET_POLLS = 'GET_POLLS';
export function getPolls() {
	const payload = axios.get(`${ROOT_API}${POLL_API}`);

	return {
		type: GET_POLLS,
		payload
	}
}

// POLL ACTIONS

// using redux-thunk to allow for asynch dispatching!

export function refreshPoll(pollId, votedFor = null, newOption = null) {
	let url, type;

	if (votedFor) {
		// need to +1 an option, call is diff
		url = `${ROOT_API}${POLL_API}/vote/${pollId}`;
		type = 'patch';
	}
	else if (newOption) {
		//build a new option
	}
	else {
		// just pulling a poll
		url = `${ROOT_API}${POLL_API}/single/${pollId}`;
		type = 'get';
	}
		return function(dispatch) {
			return makeAxiosRequest(type, url, {votedFor}).then((response) => { dispatch(processRefresh(response.data)) })
		}
}

export const REFRESH_POLL = 'REFRESH_POLL';
export function processRefresh(poll) {
	return {
		type: REFRESH_POLL,
		poll
	}
}

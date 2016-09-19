import axios from 'axios';
import makeAxiosRequest from '../helpers/axios-helper';

const ROOT_API = 'http://127.0.0.1:3000/api';
const POLL_API = '/polls';
const USER_API = '/users';

export const GET_POLLS = 'GET_POLLS';
export function getPolls() {
	const payload = axios.get(`${ROOT_API}${POLL_API}`);

	return {
		type: GET_POLLS,
		payload
	}
}

// POLL ACTIONS

export const REFRESH_POLL = 'REFRESH_POLL';
export function refreshPoll(pollId, votedFor = null, newOption = null) {
	let url, type, payload;

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
	payload = makeAxiosRequest(type, url, {votedFor}).catch((e)=>{ console.log(e)});
	return {
		type: REFRESH_POLL,
		payload
	}
}

// USER ACTIONS


export const LOGIN_USER = 'LOGIN_USER';
export function loginUser(user = {}, newUser = false) {
	let payload;
	if (newUser) {

		return makeAxiosRequest('post', `${ROOT_API}${USER_API}/register`, user)
			.then(() => {
				payload = makeAxiosRequest('post', `${ROOT_API}/authenticate`, user);
				return {
					type: LOGIN_USER,
					payload
				}
		}).catch((e) => { console.log(e) });

	}

	else {
		payload = makeAxiosRequest('post', `${ROOT_API}/authenticate`, user)
			.catch((e) => { console.log(e)});
		return {
			type: LOGIN_USER,
			payload
		}
	}
}

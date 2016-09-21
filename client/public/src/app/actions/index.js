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

export const EMPTY_POLL = 'EMPTY_POLL';
export function emptyPoll() {
	return {
		type: EMPTY_POLL
	}
}

// USER ACTIONS


export const LOGIN_USER = 'LOGIN_USER';
function loginUser(user) {
	return {
		type: LOGIN_USER,
		payload: user
	}
}

export const LOGIN_ERROR = 'LOGIN_ERROR';
function userLoginError(error) {
	return {
		type: LOGIN_ERROR,
		payload: error
	}
}

export function loginRequest(user = {}, newUser = false) {
	let payload;
	return (dispatch) => {
		dispatch(showLoader());

		if (newUser) {
			return makeAxiosRequest('post', `${ROOT_API}${USER_API}/register`, user)
				.then(() => {
					makeAxiosRequest('post', `${ROOT_API}/authenticate`, user)
						.then((response) => { 
							dispatch(loginUser(response));
							dispatch(hideLoader()); 
						});
			}).catch((e) => { 
					dispatch(userLoginError(e));
			});
		}

		else {
			return makeAxiosRequest('post', `${ROOT_API}/authenticate`, user)
				.then((response) => { 
					dispatch(loginUser(response));
					dispatch(hideLoader()); 
				})
				.catch((e) => { 
					dispatch(userLoginError(e));
			});
		}
	}
}



// LOADER ACTIONS

export const SHOW_LOADER = 'SHOW_LOADER';
function showLoader() {
	return {
		type: SHOW_LOADER
	}
}

export const HIDE_LOADER = 'HIDE_LOADER';
function hideLoader() {
	return {
		type: HIDE_LOADER
	}
}




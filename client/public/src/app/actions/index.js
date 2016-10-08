import axios from 'axios';
import makeAxiosRequest from '../helpers/axios-helper';

const ROOT_API = 'http://127.0.0.1:3000/api';
const USER_API = '/users';

// POLL ACTIONS

export const GET_POLLS = 'GET_POLLS';
export function getPolls() {
	const payload = makeAxiosRequest('get',`${ROOT_API}/polls`);
	return {
		type: GET_POLLS,
		payload
	}
}

export const GET_USER_POLLS = 'GET_USER_POLLS';
export function getUserPolls(userId, token) {
	const payload = makeAxiosRequest('get', `${ROOT_API}/polls/${userId}`, { token });
	return {
		type: GET_USER_POLLS,
		payload
	}
}

export const REFRESH_POLL = 'REFRESH_POLL';
export function refreshPoll(pollId, votedFor = null, newOption = false, token) {
	let url, type, payload;

	if (votedFor && !newOption) {
		url = `${ROOT_API}/polls/vote/${pollId}`;
		type = 'patch';
	}
	else if (newOption) {
		url = `${ROOT_API}/polls/${pollId}`;
		type = 'patch';
	}
	else if (pollId) {
		url = `${ROOT_API}/polls/single/${pollId}`;
		type = 'get';
	}
	payload = makeAxiosRequest(type, url, {votedFor, token}).catch((e)=>{ console.log(e)} );
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

export const CLEAR_POLLS = 'CLEAR_POLLS';
export function clearPolls() {
	return {
		type: CLEAR_POLLS
	}
}

export function createNewPoll(poll){
	console.log('Dispatching create new poll')

	// request to make a poll and add it to database 
	return (dispatch) => {
		dispatch(showLoader());

		return makeAxiosRequest('post', `${ROOT_API}/polls`, poll)
			.then((response) => {
				console.log('succeeded');
				dispatch(refreshPoll(response.data._id));
				dispatch(hideLoader());
			})
			.catch((e) => {
				console.log(e)
				dispatch(hideLoader());

			});
	}
}

export const CREATE_POLL_SUCCESS = 'CREATE_POLL_SUCCESS';
function createPollSuccess() {
	return {
		type: CREATE_POLL_SUCCESS
	}
}

export const CREATE_POLL_FAIL = 'CREATE_POLL_FAIL';
function createPollFail(e) {
	return {
		type: CREATE_POLL_FAIL,
		e
	}
}

export function deletePoll(id, token) {
	return (dispatch) => {
		dispatch(showLoader());

		return makeAxiosRequest('delete', `${ROOT_API}/polls/${id}`, { token })
			.then((response) => {
				console.log(response);
				dispatch(deletePollSuccess());
				dispatch(hideLoader());
		}).catch((e)=>{ 
				console.log(e)
				dispatch(deletePollFail(e));
				dispatch(hideLoader());
		});
	}
}

export const DELETE_POLL_SUCCESS = 'DELETE_POLL_SUCCESS';
function deletePollSuccess() {
	return {
		type: DELETE_POLL_SUCCESS
	}
}

export const DELETE_POLL_FAIL = 'DELETE_POLL_FAIL';
function deletePollFail(e) {
	return {
		type: DELETE_POLL_FAIL,
		e
	}
}

// USER ACTIONS

export const LOGIN_FROM_STORAGE = 'LOGIN_FROM_STORAGE';
export function loginFromStorage(token) {
	return (dispatch) => {
		return makeAxiosRequest('post', `${ROOT_API}/users/authenticate`, { token })
			.then((response) => {
				const user = {
					data: {
						auth: { token },
						username: response.data.username,
						id: response.data.id
					}
				}
				dispatch(loginUser(user))
			})
			.catch((e) => {
				dispatch(userLoginError(e))
		})
	}
}


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

export const LOGOUT_USER = 'LOGOUT_USER';
export function logoutUser() {
	return {
		type: LOGOUT_USER
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




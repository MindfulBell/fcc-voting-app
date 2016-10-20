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
export function refreshPoll(poll) {
	return {
		type: REFRESH_POLL,
		payload: poll
	}
}

export function voteOnPoll(pollId, votedFor, newOption = false, token = null){
	return (dispatch) => {
		dispatch(showLoader());
		const url = newOption ? `${ROOT_API}/polls/${pollId}`: `${ROOT_API}/polls/vote/${pollId}`;
		makeAxiosRequest('patch', url, {votedFor, token})
			.then((response) => {
				dispatch(hideLoader());
				dispatch(refreshPoll(response.data));
			})
			.catch((e) => {
				console.log(e);
				dispatch(hideLoader());
				// handle vote fail
			})
	}
}

export function getPoll(pollId) {
	const url = `${ROOT_API}/polls/single/${pollId}`;
	return (dispatch) => {
		makeAxiosRequest('get', url)
			.then((response) => {
				dispatch(refreshPoll(response.data));
			})
			.catch((e) => {
				console.log(e);
				// handle get vote fail
			})		
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

export function createNewPoll(pollWithToken){
	// request to make a poll and add it to database 
	return (dispatch) => {
		dispatch(showLoader());

		return makeAxiosRequest('post', `${ROOT_API}/polls`, pollWithToken)
			.then((response) => {
				console.log('succeeded');
				dispatch(refreshPoll(response.data._id));
				dispatch(hideLoader());
				dispatch(createPollSuccess());
			})
			.catch((e) => {
				console.log(e)
				dispatch(hideLoader());
				dispatch(createPollFail());
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
function createPollFail() {
	return {
		type: CREATE_POLL_FAIL
	}
}

export function deletePoll(id, token) {
	return (dispatch) => {
		dispatch(showLoader());

		return makeAxiosRequest('delete', `${ROOT_API}/polls/${id}`, { token })
			.then((response) => {
				dispatch(deletePollSuccess());
				dispatch(hideLoader());
		}).catch((e)=>{ 
				console.log(e);
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
		type: DELETE_POLL_FAIL
	}
}

export const CLEAR_POLL_ERROR = 'CLEAR_POLL_ERROR';
export function clearPollError() {
	return {
		type: CLEAR_POLL_ERROR
	}
}

export const RESET_SUCCESS = 'RESET_SUCCESS';
export function resetSuccess() {
	return { 
		type: RESET_SUCCESS
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
				console.log('Token may have expired')
		})
	}
}


export function loginRequest(user = {}, newUser = false) {
	return (dispatch) => {
		dispatch(showLoader());
		if (newUser) {
			return makeAxiosRequest('post', `${ROOT_API}${USER_API}/register`, user)
				.then((response) => {
					if (response.data.success === false) {
						dispatch(createUserError(response.data.message));
						dispatch(hideLoader());
					}
					else {
						makeAxiosRequest('post', `${ROOT_API}/authenticate`, user)
							.then((response) => {
								dispatch(loginUser(response));
								dispatch(hideLoader()); 
							})
					}
			}).catch((e) => { 
				dispatch(createUserError(e));
				dispatch(hideLoader());
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

export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'
function createUserError(message) {
	return {
		type: CREATE_USER_ERROR,
		payload: message
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

export const CLEAR_CREATE_ERROR = 'CLEAR_CREATE_ERROR';
export function clearCreateError() {
	return {
		type: CLEAR_CREATE_ERROR
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




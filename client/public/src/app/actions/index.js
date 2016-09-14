import axios from 'axios';

const ROOT_API = 'http://localhost:3000/api';
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

export const SET_ACTIVE_POLL = 'SET_ACTIVE_POLL';
export function setActivePoll(id) {
	const payload = axios.get(`${ROOT_API}${POLL_API}/single/${id}`);
	return {
		type: SET_ACTIVE_POLL,
		payload
	}
}
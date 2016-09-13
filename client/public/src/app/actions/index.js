import axios from 'axios';

const ROOT_API = '127.0.0.1/api';
const POLL_API = '/polls';

export const GET_POLLS = 'GET_POLLS';
export function getPolls() {
	const payload = axios.get('http://localhost:3000/api/polls');

	return {
		type: GET_POLLS,
		payload
	}
}

export const GET_ACTIVE_POLLS = 'GET_ACTIVE_POLLS';
export function getActivePolls() {
	// where is this dispatched? 
}
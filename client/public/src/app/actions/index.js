import axios from 'axios';

const ROOT_POLL_API = '/api/polls';

export const GET_POLLS = 'GET_POLLS';
export function getPolls() {
	console.log('TEST');
	const payload = axios.get(ROOT_POLL_API);

	return {
		type: GET_POLLS,
		payload
	}
}
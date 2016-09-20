import axios from 'axios';

export default function makeAxiosRequest(type, url, body = {}) {
	switch (type) {
		case 'get': 
			return axios.get(url);
		case 'patch':
			return axios.patch(url, body);
		case 'delete':

		case 'post':
			return axios.post(url, body);
		default:
			return 'No request made!';
	}
}
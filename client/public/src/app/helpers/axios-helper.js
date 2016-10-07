import axios from 'axios';

export default function makeAxiosRequest(type, url, body = {}) {
	switch (type) {
		case 'get': 
			if (body.token) {
				return axios.get(url, { headers: {'X-Access-Token': body.token }})
			}
			return axios.get(url, { params: body } );
		case 'patch':
			return axios.patch(url, body);
		case 'delete':
			return axios.delete(url, { headers: {'X-Access-Token': body.token }})			
		case 'post':
			return axios.post(url, body);
		default:
			return 'No request made!';
	}
}
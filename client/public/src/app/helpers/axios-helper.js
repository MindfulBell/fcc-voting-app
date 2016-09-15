import axios from 'axios';

export default function makeAxiosRequest(type, url, body = {}) {
	switch (type) {
		case 'get': 
			return axios.get(url);
		case 'patch':
			return axios.patch(url, body);
		case 'delete':

		case 'post':

		default:
			return 'No request made!';
	}
}


// export function refreshPoll(pollId, votedFor = null, newOption = null) {
// 	if (votedFor) {
// 		// vote on a poll's option
// 		return function(dispatch) {
// 			axios.patch(`${ROOT_API}${POLL_API}/vote/${pollId}`, {votedFor})
// 				.then((response) => { 
// 					dispatch(processRefresh(response.data));
// 			});
// 		}
// 	}
// 	else if (newOption) {
// 		//build a new option
// 	}
// 	else {
// 		return function(dispatch) {
// 			axios.get(`${ROOT_API}${POLL_API}/single/${pollId}`)
// 				.then((response) => {
// 					dispatch(processRefresh(response.data))
// 			});
// 		}
// 	}
// }
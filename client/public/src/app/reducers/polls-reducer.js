import { GET_POLLS } from '../actions/index';

const INITIAL_POLLS_STATE = {
	pollsList: [],
	activePoll: {}
};

export default function (state = INITIAL_POLLS_STATE, action) {
	switch (action.type) {
		case GET_POLLS: 

			//go into data and build a new array with titles and ids
			let pollsList = state.payload.map((poll) => {
				return {
					'title': poll.title,
					'id': poll._id
				}
				// for (let prop in poll) {
				// 	if (poll.hasOwnProperty(prop) && (prop === 'title' || prop === '_id') {
				// 		pollObj[prop] = poll[prop];
				// 	}
				// }				
			});
			return Object.assign({}, state, { pollsList });
		default: 
			return state;
	}
}
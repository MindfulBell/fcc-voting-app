import { GET_POLLS } from '../actions/index';

const INITIAL_POLLS_STATE = {
	pollsList: [],
	activePoll: {}
};

export default function (state = INITIAL_POLLS_STATE, action) {
	switch (action.type) {
		case GET_POLLS: 
			//go into data and build a new array with titles and ids
			let pollsList = action.payload.data.map((poll) => {
				return {
					'title': poll.title,
					'id': poll._id
				}				
			});
			return Object.assign({}, state, { pollsList });
		case GET_ACTIVE_POLL: 
			return state;
		default: 
			return state;
	}
}
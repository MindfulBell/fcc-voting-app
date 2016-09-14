import { GET_POLLS, SET_ACTIVE_POLL } from '../actions/index';

const INITIAL_POLLS_STATE = {
	pollsList: [],
	activePoll: {}
};

export default function (state = INITIAL_POLLS_STATE, action) {
	switch (action.type) {

		case GET_POLLS: 
			let pollsList = action.payload.data.map((poll) => {
				return {
					'title': poll.title,
					'id': poll._id
				}				
			});
			return Object.assign({}, state, { pollsList });

		case SET_ACTIVE_POLL: 
			let activePoll = action.payload.data[0];
			console.log(activePoll);
			return Object.assign({}, state, { activePoll });

		default: 
			return state;
	}
}
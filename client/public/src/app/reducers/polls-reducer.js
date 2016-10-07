import { GET_POLLS, REFRESH_POLL, EMPTY_POLL, GET_USER_POLLS, CLEAR_POLLS, DELETE_POLL_SUCCESS, DELETE_POLL_FAIL } from '../actions/index';

const INITIAL_POLLS_STATE = {
	pollsList: [],
	activePoll: {},
	deletePollFail: false
};

export default function (state = INITIAL_POLLS_STATE, action) {
	switch (action.type) {
		case GET_POLLS: 
		case GET_USER_POLLS:
			let pollsList = action.payload.data.map((poll) => {
				return {
					'title': poll.title,
					'id': poll._id
				}				
			});
			return Object.assign({}, state, { pollsList });

		case CLEAR_POLLS:
			return Object.assign({}, state, { pollsList: [] });

		case REFRESH_POLL: 
			let activePoll = action.payload.data;
			return Object.assign({}, state, { activePoll });

		case EMPTY_POLL:
		case DELETE_POLL_SUCCESS:
			return Object.assign({}, state, { activePoll: {} });

		case DELETE_POLL_FAIL:


		default: 
			return state;
	}
}
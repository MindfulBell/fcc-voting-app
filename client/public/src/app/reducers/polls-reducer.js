import { GET_POLLS, REFRESH_POLL, EMPTY_POLL, GET_USER_POLLS, RESET_SUCCESS, CLEAR_POLLS, CREATE_POLL_FAIL, CREATE_POLL_SUCCESS, DELETE_POLL_SUCCESS, DELETE_POLL_FAIL, CLEAR_POLL_ERROR } from '../actions/index';

const INITIAL_POLLS_STATE = {
	pollsList: [],
	activePoll: {},
	pollErrorMessage: '',
	deleteSuccess: false
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
			let activePoll = action.payload;
			activePoll.id = activePoll._id;
			delete activePoll._id;
			return Object.assign({}, state, { activePoll });

		case EMPTY_POLL:
		case DELETE_POLL_SUCCESS:
			return Object.assign({}, state, { activePoll: {}, pollErrorMessage: '', deleteSuccess: true });
		case CREATE_POLL_SUCCESS:
			return Object.assign({}, state, { pollErrorMessage: '' })
		case DELETE_POLL_FAIL:
		case CREATE_POLL_FAIL:
			return Object.assign({}, state, { pollErrorMessage: "Hmm, something's wrong, please try again later!"})

		case CLEAR_POLL_ERROR: 
			return Object.assign({}, state, { pollErrorMessage: '' })
		case RESET_SUCCESS: 
			return Object.assign({}, state, { deleteSuccess: false })
		default: 
			return state;
	}
}
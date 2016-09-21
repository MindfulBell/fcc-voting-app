import { LOGIN_USER, LOGIN_ERROR } from '../actions/index';

const INITIAL_USER_STATE = {
	username: '',
	token: '',
	id: '',
	loggedIn: false,
	validate: {},
	auth: {}
}

export default function (state = INITIAL_USER_STATE, action) {
	switch (action.type) {
		case LOGIN_USER:
			if (action.payload.data.auth.token) {
				return Object.assign({}, state, action.payload.data, { loggedIn: true });
			}
			else {
				return Object.assign({}, state, { auth: { success: false } });
			}
		case LOGIN_ERROR:
			return Object.assign({}, state, { auth: { success: false, error: action.payload }})
		default: 
			return state;
	}
}
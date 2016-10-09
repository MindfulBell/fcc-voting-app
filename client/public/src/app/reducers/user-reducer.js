import { LOGIN_USER, LOGIN_ERROR, LOGOUT_USER, CREATE_USER_ERROR, CLEAR_CREATE_ERROR } from '../actions/index';

const INITIAL_USER_STATE = {
	username: '',
	id: '',
	loggedIn: false,
	auth: {},
	createError: ''
}

export default function (state = INITIAL_USER_STATE, action) {
	switch (action.type) {
		case LOGIN_USER:
			if (action.payload.data.auth.token) {
				return Object.assign({}, state, action.payload.data, { loggedIn: true, createError: '' } );
			}
			else {
				return Object.assign({}, state, { auth: { success: false } });
			}
		case LOGIN_ERROR:
			return Object.assign({}, state, { auth: { success: false, error: action.payload }});

		case LOGOUT_USER:
			return Object.assign({}, state, INITIAL_USER_STATE);
		case CREATE_USER_ERROR:
			return Object.assign({}, state, { createError: action.payload })
		case CLEAR_CREATE_ERROR:
			return Object.assign({}, state, { createError: '' })
		default: 
			return state;
	}
}
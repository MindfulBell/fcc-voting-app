import { LOGIN_USER } from '../actions/index';

const INITIAL_USER_STATE = {
	username: '',
	token: '',
	id: '',
	loggedIn: false
}

export default function (state = INITIAL_USER_STATE, action) {
	switch (action.type) {
		// case CREATE_USER:
		// 	return Object.assign({}, state, action.user);
		case LOGIN_USER:
			if (action.payload.data.token) {
				return Object.assign({}, state, action.payload.data, {loggedIn: true});
			}
		default: 
			return state;
	}
}
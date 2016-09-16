import { combineReducers } from 'redux';
import pollsReducer from './polls-reducer';
import userReducer from './user-reducer';
import  { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	polls: pollsReducer,
	user: userReducer,
	form: formReducer
});

export default rootReducer;
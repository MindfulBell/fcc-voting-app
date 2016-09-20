import { combineReducers } from 'redux';
import pollsReducer from './polls-reducer';
import userReducer from './user-reducer';
import loader from './loader-reducer';
import  { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
	polls: pollsReducer,
	user: userReducer,
	form: formReducer,
	loader,
});

export default rootReducer;
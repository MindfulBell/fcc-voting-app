import { combineReducers } from 'redux';
import pollsReducer from './polls-reducer';

const rootReducer = combineReducers({
	polls: pollsReducer
});

export default rootReducer;
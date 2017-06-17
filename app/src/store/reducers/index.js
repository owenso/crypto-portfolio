import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import user from './userReducer';

const reducers = combineReducers({
	routing: routerReducer,
	user
});

export default reducers;
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import price from './priceReducer';
import user from './userReducer';

const reducers = combineReducers({
	routing: routerReducer,
	price,
	user
});

export default reducers;
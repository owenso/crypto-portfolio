import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

const middleware = [thunkMiddleware, routerMiddleware(browserHistory)];

if (process.env.NODE_ENV !== 'prod') {  
	const loggerMiddleware = createLogger();
	middleware.push(loggerMiddleware);
}

export default function configureStore(preloadedState) {
	return createStore(
    reducers,
    preloadedState,
    applyMiddleware(...middleware)
  );
}
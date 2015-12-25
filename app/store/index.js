import reducer from '../reducers/index';
import { createStore, applyMiddleware } from '../../node_modules/redux/lib/index';
// import logger from 'redux-logger';
import thunk from '../../node_modules/redux-thunk/lib/index';

// const middleware = process.env.NODE_ENV === 'production' ? [thunk] : [thunk, logger()];
const middleware = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducer);

export default store;

import {applyMiddleware, createStore, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducer from './reducers'


/** Basic redux store */
const middleware = applyMiddleware(promise(), thunk, logger());
export default createStore(reducer, compose(middleware));
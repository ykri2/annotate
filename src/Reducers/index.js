import {combineReducers} from 'redux';
import unoReducer from './unoReducer.js';
import annotations from './annotationReducer';


/** Reducers index file **/
const appReducer = combineReducers({
    unoReducer,
    annotations
});


export default (state, action) => {
    if(action.type === 'FETCH_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action);
}
import {combineReducers} from 'redux';

import annotations from './annotationReducer';


/** Reducers index file **/
const appReducer = combineReducers({
    annotations
});


export default (state, action) => {
    if(action.type === 'FETCH_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action);
}
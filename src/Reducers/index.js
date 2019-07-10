import {combineReducers} from 'redux';

import annotations from './annotationReducer';


/** Reducers index file **/
const appReducer = combineReducers({
    /** add reducers below */
    annotations
});

/** Logout action - unused at the moment as there is no login :D */
export default (state, action) => {
    if(action.type === 'FETCH_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action);
}
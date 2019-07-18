import {combineReducers} from 'redux';

import annotations from './annotationReducer';
import files from './filesReducer';
import currentFile from './currentFileReducer';
import concepts from './conceptReducer';
import concept_types from './conceptTypesReducer';

/** Reducers index file **/
const appReducer = combineReducers({
    /** add reducers below */
    annotations,
    files,
    currentFile,
    concepts,
    concept_types
});

/** Logout action - unused at the moment as there is no login :D */
export default (state, action) => {
    if(action.type === 'FETCH_LOGOUT') {
        state = undefined
    }
    return appReducer(state, action);
}
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

export default (state, action) => {

    return appReducer(state, action);
}
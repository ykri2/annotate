
/** Redux action - add new concept types to global redux store */
export function addGlobalConceptTypes(newConceptTypes){
	return function(dispatch){

		dispatch({type: 'ADD_CONCEPT_TYPES_PROGRESSING'})

		/** set timeout */
		setTimeout(function(){ 
			dispatch({type: 'ADD_CONCEPT_TYPES_FULFILLED', payload: newConceptTypes}) 
		}, 1000);

	}
}
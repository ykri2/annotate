
/** Redux action */
export function addGlobalConceptTypes(newConceptTypes){
    console.log(newConceptTypes)

	return function(dispatch){

		dispatch({type: 'ADD_CONCEPT_TYPES_PROGRESSING'})

		/** set timeout - switch with API-call when backend is added  */
		setTimeout(function(){ 
			dispatch({type: 'ADD_CONCEPT_TYPES_FULFILLED', payload: newConceptTypes}) 
		}, 1000);

	}
}
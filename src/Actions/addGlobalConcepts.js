
/** Redux action */
export function addGlobalConcepts(newConcepts){
    console.log(newConcepts)

	return function(dispatch){

		dispatch({type: 'ADD_CONCEPTS_PROGRESSING'})

		/** set timeout - switch with API-call when backend is added  */
		setTimeout(function(){ 
			dispatch({type: 'ADD_CONCEPTS_FULFILLED', payload: newConcepts}) 
		}, 1000);

	}
}
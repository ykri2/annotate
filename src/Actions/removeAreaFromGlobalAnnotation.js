
/** Redux action - removes area from redux store "global" annotation */
export function removeAreaFromGlobalAnnotation(id, local_id){


	return function(dispatch){

		dispatch({type: 'REMOVE_AREA_PROGRESSING'})

		/** set timeout - switch with API-call when backend is added  */
		setTimeout(function(){ 
			dispatch({type: 'REMOVE_AREA_FULFILLED', payload: { id: id, local_id: local_id }}) 
		}, 1000);

	}
}

/** Redux action - removes area from redux store "global" annotation */
export function removeAreaFromGlobalAnnotation(aid, id, object_pos){
	console.log('removing area')

	return function(dispatch){

		dispatch({type: 'REMOVE_AREA_PROGRESSING'})

		/** set timeout - switch with API-call when backend is added  */
		setTimeout(function(){ 
			dispatch({type: 'REMOVE_AREA_FULFILLED', payload: { annot_id: aid, id: id, object_pos: object_pos }}) 
		}, 1000);

	}
}
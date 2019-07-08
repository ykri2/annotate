

export function removeAreaFromGlobalAnnotation(aid, id, object_pos){


	return function(dispatch){

		dispatch({type: 'REMOVE_AREA_PROGRESSING'})

		setTimeout(function(){ 
			dispatch({type: 'REMOVE_AREA_FULFILLED', payload: { annot_id: aid, id: id, object_pos: object_pos }}) 
		}, 2000);

	}
}
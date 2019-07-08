

export function removeAreaFromGlobalAnnotation(aid, id, object_pos){
	console.log('removing area')
	console.log(id)
	console.log(aid)
	console.log(object_pos)
	return function(dispatch){

		dispatch({type: 'REMOVE_AREA_PROGRESSING'})

		setTimeout(function(){ 
			dispatch({type: 'REMOVE_AREA_FULFILLED', payload: { annot_id: aid, id: id, object_pos: object_pos }}) 
		}, 2000);

	}
}
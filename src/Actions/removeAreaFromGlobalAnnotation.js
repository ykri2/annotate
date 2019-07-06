

export function removeAreaFromGlobalAnnotation(aid, id){
	console.log('removing area')
	console.log(id)

	return function(dispatch){

		dispatch({type: 'REMOVE_AREA_PROGRESSING'})

		setTimeout(function(){ 
			dispatch({type: 'REMOVE_AREA_FULFILLED', payload: { annot_id: aid, area_id: id }}) 
		}, 2000);

	}
}
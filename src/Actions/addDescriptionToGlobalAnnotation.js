

export function addDescriptionToGlobalAnnotation(currentAnnotation, newAnnotation){
	let currentAnnotationObj = currentAnnotation;
	currentAnnotationObj.file_properties = newAnnotation;


	return function(dispatch){

		dispatch({type: 'ADD_DESCRIPTION_PROGRESSING'})

		setTimeout(function(){ 
			dispatch({type: 'ADD_DESCRIPTION_FULFILLED', payload: currentAnnotationObj}) 
		}, 2000);

	}
}


export function addDescriptionToGlobalAnnotation(currentAnnotation, newAnnotation){
	console.log('adding description')

	let currentAnnotationObj = currentAnnotation;

	currentAnnotationObj.file_properties = newAnnotation;

	console.log(currentAnnotationObj)

	return function(dispatch){

		dispatch({type: 'ADD_DESCRIPTION_PROGRESSING'})

		setTimeout(function(){ 
			dispatch({type: 'ADD_DESCRIPTION_FULFILLED', payload: currentAnnotationObj}) 
		}, 2000);

	}
}
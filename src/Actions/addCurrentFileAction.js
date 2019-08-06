
/** Redux action - changes the stored index that determines what image to show on canvas */
export function addCurrentFileAction(newId){

	
	return function(dispatch){

		dispatch({type: 'ADD_CURERNT_FILE_PROGRESSING'})

		/** set timeout  */
		setTimeout(function(){ 
			dispatch({type: 'ADD_CURRENT_FILE_FULFILLED', payload: newId }) 
		}, 100);

	}
}
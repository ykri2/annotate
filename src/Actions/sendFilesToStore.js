
/** Redux action - loads files/images into redux storage */
export function sendFilesToStore(files){
	return function(dispatch){

		dispatch({type: 'ADD_FILES_PROGRESSING'})

		/** set timeout */
		setTimeout(function(){ 
			dispatch({type: 'ADD_FILES_FULFILLED', payload: files }) 
		}, 1000);

	}
}

/** Redux action - loads files into redux storage */
export function sendFilesToStore(files){
	console.log('adding files to global storage')

	return function(dispatch){

		dispatch({type: 'ADD_FILES_PROGRESSING'})

		/** set timeout -  */
		setTimeout(function(){ 
			dispatch({type: 'ADD_FILES_FULFILLED', payload: files }) 
		}, 1000);

	}
}
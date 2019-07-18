
/** Redux action - removes area from redux store "global" annotation */
export function addCurrentFileAction(newId){
	console.log('update curent file array loc')

	return function(dispatch){

		dispatch({type: 'ADD_CURERNT_FILE_PROGRESSING'})

		/** set timeout - switch with API-call when backend is added  */
		setTimeout(function(){ 
			dispatch({type: 'ADD_CURRENT_FILE_FULFILLED', payload: newId }) 
		}, 100);

	}
}
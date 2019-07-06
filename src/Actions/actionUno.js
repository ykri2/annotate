import 'whatwg-fetch';

export function unoAction(info){
	console.log('wearehere')
	console.log(info);

	return function(dispatch){

		dispatch({type: 'FETCH_UNO_PROGRESSING'})

		fetch(' http://127.0.0.1:5000/unomomenteprofavor', {
			method: 'GET',
			headers: {
			  'Content-Type': 'application/json',
			},

		  })
		.then((response) => {

			return response.json()	
			
		}).then((pload) => {

			console.log(pload)
			dispatch({type: 'FETCH_UNO_FULFILLED', payload: pload})	

		}).catch((err) => {
            	dispatch({type: 'FETCH_UNO_REJECTED', payload: err})	
		});
	}
}
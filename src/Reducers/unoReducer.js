const initialState = { 
    data: {},
    fetching: false,
    fetched: false,
    error: null,

}


/** Example reducer **/
export default function reducer(state=initialState, action){
    switch(action.type){
        case "FETCH_UNO_PROGRESSING":{
            return {...state, fetching:true}
        }
        case "FETCH_UNO_REJECTED":{
            return {...state, fetching:false, error: action.payload}
        }
        case "FETCH_UNO_FULFILLED":{
            return {
                ...state, 
                fetching:false,
                fetched: true,
                data: action.payload
            }
        } default: return state;
    }

}

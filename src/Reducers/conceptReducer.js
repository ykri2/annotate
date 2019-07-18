/** initialState for global concepts storage in redux store  */
const initialState = {
    concepts: [],
    fetching: false,
    fetched: false,
    error: null,
} 


/** ADD CONCEPTS CASES */
export default function reducer(state=initialState, action){
   switch(action.type){

      case "ADD_CONCEPTS_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "ADD_CONCEPTS_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "ADD_CONCEPTS_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            concepts: action.payload
         }
      } default: return state;
   } 
}
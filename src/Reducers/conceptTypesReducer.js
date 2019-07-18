/** initialState for global types storage in redux store  */
const initialState = {
    concept_types: [],
    fetching: false,
    fetched: false,
    error: null,
}


/** ADD TYPES CASES */
export default function reducer(state=initialState, action){
   switch(action.type){

      case "ADD_CONCEPT_TYPES_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "ADD_CONCEPT_TYPES_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "ADD_CONCEPT_TYPES_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            concept_types: action.payload
         }
      } default: return state;
   }


}
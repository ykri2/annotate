/** initialState for global annotations storage in redux store  */
const initialState = {
    files: [],
    fetching: false,
    fetched: false,
    error: null,
}


/** ADD FILES CASES */
export default function reducer(state=initialState, action){
   switch(action.type){

      case "ADD_FILES_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "ADD_FILES_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "ADD_FILES_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            files: action.payload
         }
      } default: return state;
   }


}

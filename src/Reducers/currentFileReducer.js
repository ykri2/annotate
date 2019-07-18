/** initialState for global annotations storage in redux store  */
const initialState = {
    currentFile: undefined,
    fetching: false,
    fetched: false,
    error: null,
}


/** ADD FILES CASES */
export default function reducer(state=initialState, action){
   switch(action.type){

      case "ADD_CURRENT_FILE_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "ADD_CURRENT_FILE_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "ADD_CURRENT_FILE_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            currentFile: action.payload
         }
      } default: return state;
   }


}

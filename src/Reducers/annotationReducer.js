/** initialState for global annotations storage in redux store  */
const initialState = {
    annotations: [],
   fetching: false,
   fetched: false,
   error: null,
}


/** ALL ANNOTATION CASES */
export default function reducer(state=initialState, action){
   switch(action.type){
      case "FETCH_ANNOTATIONS_COMPLETE": {
         return Object.assign({}, state, {
            annotations: action.payload,
         })
      }
      case "ADD_ANNOTATIONS_COMPLETE": {
         return Object.assign({}, state, {
            annotations: action.payload
         });
      }  
      case "REMOVE_ANNOTATIONS_COMPLETE": {
         return Object.assign({}, state, {
            annotations: action.payload
         })
      }
      /** ADD AREA TO ANNOTATION CASES */
      case "ADD_AREA_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "ADD_AREA_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "ADD_AREA_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            annotations: state.annotations.length < 1 || action.payload.exists === false
                           ? 
                        [...state.annotations, action.payload.co] 
                           :
                        state.annotations.map((annotation) => {
                           if(annotation.local_id === action.payload.local_id) { annotation === action.payload.co }
                              return annotation
                           })
                              
                              
                     
         }
      }
      /** REMOVED AREA FROM ANNOTATION CASES */
      case "REMOVE_AREA_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "REMOVE_AREA_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "REMOVE_AREA_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            annotations: state.annotations.map((annotation) => {
               if(annotation.local_id === action.payload.local_id) {
                  let areas = annotation.areas
                  const placement = areas.findIndex(e => e.shape_attribute.id === action.payload.id);
              
                  annotation.areas = areas.filter((area) => {
                     return area.shape_attribute.id !== action.payload.id
                  })
                  
                  return annotation
               } else { return  annotation }
       
            })
         }
      }

      /** ADD DESCRIPTION TO ANNOTATION CASES */
      case "ADD_DESCRIPTION_PROGRESSING":{
         return {...state, fetching:true}
      }
      case "ADD_DESCRIPTION_REJECTED":{
         return {...state, fetching:false, error: action.payload}
      }
      case "ADD_DESCRIPTION_FULFILLED":{
         return {
            ...state, 
            fetching:false,
            fetched: true,
            annotations: state.annotations.length < 1
                           ? 
                        [...state.annotations, action.payload.co] 
                           :
                        state.annotations.map((annotation) => {
                           if(annotation.local_id === action.payload.local_id) { annotation === action.payload.co }
                              return annotation
                           })
            
         }
      } default: return state;
   }


}
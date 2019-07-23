/** initialState for global annotations storage in redux store  */
const initialState = {
    annotations: [],
   fetching: false,
   fetched: false,
   error: null,
}


/** ADD ANNOTATION CASES */
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
      /** ADD ARE TO ANNOTATION CASES */
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



/***
 * 
 * {
         index: 0,
         file_properties: {
            what: "buildings",
            type: "city",
            short_description: "asta fera gruadda pidad deres et mu halglenh.",
            height: 1000,
            width: 1200,
            filename: "unknown_city-1",
         },
         areas: [
            { 
               shape_attribute: 
               {
                  type: "rect",
                  x: 596,
                  y: 549,
                  width: 282.9,
                  height: 72.57,
                  id: "6295ddd696-e1c9-42af-88aa-7175d5b96426",
               },
               shape_properties: {
                  what: "boat",
                  type: "vehical",
                  quality_remarks: {
                     clear_view: true,
                     well_illuminated: false 
                  }
               }
            },
            { 
               shape_attribute: 
               {
                  type: "polyline",
                  all_points: [{"x":118.89999389648438,"y":292.71665954589844},{"x":189.89999389648438,"y":257.71665954589844},{"x":228.89999389648438,"y":294.71665954589844},{"x":229.89999389648438,"y":323.71665954589844},{"x":307.8999938964844,"y":354.71665954589844},{"x":337.8999938964844,"y":381.71665954589844},{"x":313.8999938964844,"y":427.71665954589844},{"x":210.89999389648438,"y":438.71665954589844},{"x":187.89999389648438,"y":393.71665954589844},{"x":150.89999389648438,"y":389.71665954589844},{"x":123.89999389648438,"y":312.71665954589844},{"x":123.89999389648438,"y":294.71665954589844},{"x":118.89999389648438,"y":292.71665954589844}],
                  width: 336.04,
                  height: 214.213,
                  id: "6295c3676-e1c9-42af-88aa-7173456796426",
               },
               shape_properties: {
                  what: "tree",
                  type: "nature",
                  quality_remarks: {
                     clear_view: true,
                     well_illuminated: false 
                  }
               }
            },
            { 
               shape_attribute: 
               {
                  type: "ellipse",
                  x: 510.15,
                  y: 300.253,
                  rx: 235.152,
                  ry: 100,
                  id: "6295d696-e1c9-42af-88aa-7175d5b96426",
               },
               shape_properties: {
                  what: "buildings",
                  type: "block",
                  quality_remarks: {
                     clear_view: true,
                     well_illuminated: true 
                  }
               }
            }
            
         ]
      },
      {
         index: 1,
         file_properties: {
            what: "building",
            type: "city",
            short_description: "eres dere vereas gagrtatus outas dekaseli puetas veres.",
            height: 1000,
            width: 1200,
            filename: "unknown_city-2",
         },
         areas: [
            { 
               shape_attribute: 
               {
                  type: "rect",
                  x: 554.12,
                  y: 301.55,
                  width: 369,
                  height: 172.2,
                  id: "6295d696-e1c9-42af-88aa-7175d5b96e326",
               },
               shape_properties: {
                  what: "building",
                  type: "structure",
                  quality_remarks: {
                     clear_view: true,
                     well_illuminated: false 
                  }
               }
            },
            { 
               shape_attribute: 
               {
                  type: "rect",
                  x: 538.46,
                  y: 446.58,
                  width: 302.58,
                  height: 62.73,
                  id: "6295d696-e1c9-42af-88aa-73275d5b96d26"
               },
               shape_properties: {
                  what: "boat",
                  type: "vehical",
                  quality_remarks: {
                     clear_view: true,
                     well_illuminated: false 
                  }
               }
            }
         ]
      }
 * 
 * 
 */
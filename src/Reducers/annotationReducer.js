
const initialState = {
    annotations:
      [
         {
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
                  id: 0,
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
                  id: 1,
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
                  id: 2,
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
                  id: 0,
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
                  id: 1
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
   ],
   fetching: false,
   fetched: false,
   error: null,
}



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
            annotations: state.annotations.map((annotation) => {
               if(annotation.index === action.payload.index) { annotation === action.payload }
               return annotation
            })
         }
      }
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
               if(annotation.index === action.payload.annot_id) {
                  let areas = annotation.areas
                  annotation.areas = areas.splice(areas.findIndex(e => e.shape_attribute.id === action.payload.area_id), 1)
                  console.log(areas)
               }
               return annotation
            })
         }
      }

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
            annotations: state.annotations.map((annotation) => {
               if(annotation.index === action.payload.index) { annotation === action.payload }
               return annotation
            })
         }
      } default: return state;
   }


}

import { fabric } from 'fabric';



import { getAbsolutePosition } from '../Components/resources/getAbsolutePosition'



/** Redux action - adds a new area to redux store "global" annotations */
export function addAreaToGlobalAnnotation(currentAnnotation, newAnnotation, canvasObject, local_id){
	let currentAnnotationObj = currentAnnotation;
	let areas = currentAnnotationObj.areas;
	let exists = false;
	let newArea = {};


	/** decide on which type of object to add */
	if(canvasObject.type === 'polyline') {
		if((canvasObject.group.scaleX <  1 || canvasObject.group.scaleX > 1) || (canvasObject.group.scaleY > 1 || canvasObject.group.scaleY < 1)) {
			let matrix = canvasObject.calcTransformMatrix();
			canvasObject.points = canvasObject.points.map((point) => {			
				return new fabric.Point(
					point.x - canvasObject.pathOffset.x,
					point.y - canvasObject.pathOffset.y);
			}).map((point) => {			
				return fabric.util.transformPoint(point, matrix);
			})
		}
		newArea = { 
			shape_attribute: {
				type: canvasObject.type,
				all_points: canvasObject.points,
				width: (canvasObject.width * canvasObject.group.scaleX),
				height: (canvasObject.height * canvasObject.group.scaleY),
				id: canvasObject.id,
			},
			shape_properties: {
				what: newAnnotation.what,
				type: newAnnotation.type,
				quality_remarks: {
					clear_view: newAnnotation.clear_view,
					well_illuminated: newAnnotation.well_illuminated 
				}
			}
		}
	} else if(canvasObject.type === 'rect') {
		let point = getAbsolutePosition(canvasObject, 'point')
		newArea = { 
			shape_attribute: {
				type: canvasObject.type,
				x: point.x,
				y: point.y,
				width: (canvasObject.width * canvasObject.group.scaleX),
				height: (canvasObject.height * canvasObject.group.scaleY),
				id: canvasObject.id,
			},
			shape_properties: {
				what: newAnnotation.what,
				type: newAnnotation.type,
				quality_remarks: {
					clear_view: newAnnotation.clear_view,
					well_illuminated: newAnnotation.well_illuminated 
				}
			}
		}
	} else if(canvasObject.type === 'ellipse') {
		let point = getAbsolutePosition(canvasObject, 'point')
		newArea = { 
			shape_attribute: {
				type: canvasObject.type,
				x: point.x,
				y: point.y,
				rx: (canvasObject.rx * canvasObject.group.scaleX),
				ry: (canvasObject.ry * canvasObject.group.scaleY),
				originX: canvasObject.originX,
				originY: canvasObject.originY,
				id: canvasObject.id,
			},
			shape_properties: {
				what: newAnnotation.what,
				type: newAnnotation.type,
				quality_remarks: {
					clear_view: newAnnotation.clear_view,
					well_illuminated: newAnnotation.well_illuminated 
				}
			}
		}
	}
	
	/** check if the area is existent or new */
	for (let i = 0; i <= areas.length - 1; i++) {
		if(areas[i].shape_attribute.id === newArea.shape_attribute.id) {
			areas[i] = newArea;
			exists = true;
		}
	}
	if(exists !== true) {
		areas.push(newArea)
	}

	/** set currentAnnotation.areas to new array of areas */
	currentAnnotationObj.areas = areas;


	if(currentAnnotationObj.index !== "temp") {
		exists = true
	}
	currentAnnotationObj.index = "saved"
	
	console.log(currentAnnotationObj)

	return function(dispatch){

		dispatch({type: 'ADD_AREA_PROGRESSING'})

		/** set timeout - switch with API-call when backend is added  */
		setTimeout(function(){ 
			dispatch({type: 'ADD_AREA_FULFILLED', payload: { co: currentAnnotationObj, local_id: local_id, exists: exists } } ) 
		}, 500);

	}
}


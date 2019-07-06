import { fabric } from 'fabric';



export function addAreaToGlobalAnnotation(currentAnnotation, newAnnotation, canvasObject){
	let currentAnnotationObj = currentAnnotation;
	let newArea = {};
	console.log(canvasObject)
	if(canvasObject.type === 'polyline') {
		if((canvasObject.scaleX <  1 || canvasObject.scaleX > 1) || (canvasObject.scaleY > 1 || canvasObject.scaleY < 1)) {
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
				width: (canvasObject.width * canvasObject.scaleX),
				height: (canvasObject.height * canvasObject.scaleY),
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
		newArea = { 
			shape_attribute: {
				type: canvasObject.type,
				x: canvasObject.left,
				y: canvasObject.top,
				width: (canvasObject.width * canvasObject.scaleX),
				height: (canvasObject.height * canvasObject.scaleY),
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
		newArea = { 
			shape_attribute: {
				type: canvasObject.type,
				x: canvasObject.left,
				y: canvasObject.top,
				rx: (canvasObject.rx * canvasObject.scaleX),
				ry: (canvasObject.ry * canvasObject.scaleY),
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

	currentAnnotationObj.areas[canvasObject.id] = newArea;

	console.log(currentAnnotationObj)

	return function(dispatch){

		dispatch({type: 'ADD_AREA_PROGRESSING'})

		setTimeout(function(){ 
			dispatch({type: 'ADD_AREA_FULFILLED', payload: currentAnnotationObj}) 
		}, 2000);

	}
}


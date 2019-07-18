export const getAbsolutePosition = (canvasObject, key) =>{
	if(canvasObject.group) {
		if(key === 'point') {
			let matrix = canvasObject.calcTransformMatrix();
			return fabric.util.transformPoint({y: canvasObject.top, x: canvasObject.left}, matrix)
		}
		else if(key === 'angle') {
			return canvasObject.angle + canvasObject.group.angle;
		}
		else if(key === 'scaleX') {
			return canvasObject.scaleX * canvasObject.group.scaleX;
		} 
		else if(key === 'scaleY') {
			return canvasObject.scaleY * canvasObject.group.scaleY;
		}
	}
	return 'none'
}


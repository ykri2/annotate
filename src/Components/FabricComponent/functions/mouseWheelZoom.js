export const mouseWheelZoom = (canvas, options) => {
    var delta = options.e.deltaY;
    var zoom = canvas.getZoom();
    zoom = zoom + delta/200;
    if(zoom > 20) { 
      zoom = 20; 
    }
    if(zoom < 0.01) {
      zoom = 0.01;
    }

    canvas.zoomToPoint({ x: options.e.offsetX , y: options.e.offsetY }, zoom)
      options.e.preventDefault();
      options.e.stopPropagation();
      let vpt = canvas.viewportTransform;
      if(zoom < 400 / canvas.getWidth()) {
        canvas.viewportTransform[4] = 200 - canvas.getWidth() * zoom / 2;
        canvas.viewportTransform[5] = 200 - canvas.getHeight() * zoom / 2;
      } else {
        if(vpt[4] >= 0) {
          canvas.viewportTransform[4] = 0;
        } else if(vpt[4] < canvas.getWidth() - 1000 * zoom) {
          canvas.viewportTransform[4] = canvas.getWidth() - 1000 * zoom;
        }
        if(vpt[5] >= 0) {
          canvas.viewportTransform[5] = 0;
        } else if(vpt[5] < canvas.getHeight() - 1000 * zoom) {
          canvas.viewportTransform[5] = canvas.getHeight() - 1000 * zoom;
        }
      }
  }
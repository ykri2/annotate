  /** used to get mouse coordinates when drawing polygon */
export const getMouseCoordinates = (canvas, options) => {
    var pointer = canvas.getPointer(options.e);
    var px = pointer.x;
    var py = pointer.y;

    return [px, py]
  }
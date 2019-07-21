/** changes canvas listeners - removes and adds function */
export const switch_functions = (canvas, type, oldFunction, newFunction, callback) => {
    canvas.off(type, oldFunction)
    callback(type, newFunction)
  }
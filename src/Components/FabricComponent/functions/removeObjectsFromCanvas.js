/** removes object from canvas and calls callback function */
export const removeObjectsFromCanvas = (canvas, objects, callback) => {
    objects.forEach(object => {
      canvas.remove(object)
    })
    callback()
  }

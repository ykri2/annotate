/** removes object from canvas and calls callback function */
export const removeObjectsFromCanvas = (canvas, objects, callback) => {
  console.log('wehere')
    objects.forEach(object => {
      canvas.remove(object)
    })
    callback()
  }

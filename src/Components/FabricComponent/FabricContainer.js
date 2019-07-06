import React, { Fragment } from 'react'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types'
import { fabric } from 'fabric';


import PopupComponent from '../Containers/PopupComponent';
import { addAreaToGlobalAnnotation } from '../../Actions/addAreaToGlobalAnnotation';
import { addDescriptionToGlobalAnnotation } from '../../Actions/addDescriptionToGlobalAnnotation';
const img = require(`${'../resources/anntph.jpg'}`);
const baseurl = "."
/**
 * React+Fabricjs component
 * Creates the fabric canvas
 **/
class Point {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
}

class FabricContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      annotation: this.props.annotation,
      annotations: this.props.annotations,
      popup_current_area: undefined,
      popup_current_id: undefined,

      isLoading: false,
      errors: {},

      canvas: null,
      selectedObject: null,
      show_popup: false,
  
    }
    this.addNewToGlobalAnnotations = this.addNewToGlobalAnnotations.bind(this)
    this.addNewObject= this.addNewObject.bind(this)
    this.nextAnnotation = this.nextAnnotation.bind(this)
    this.prevAnnotation = this.prevAnnotation.bind(this)
    this.togglePopup = this.togglePopup.bind(this)

    this.x = 0;
    this.y = 0;

    /** drawing polyline shape */
    this.roofPoints = [];
    this.lines = [];
    this.lineCounter = 0;
    this.drawingObject = {};
    this.drawingObject.type = "";
    this.drawingObject.background = "";
    this.drawingObject.border = "";

    /** free drwaing rect and ellipse */
    this.rect; 
    this.ellipse; 
    this.isDown; 
    this.origX; 
    this.origY, 
    this.freeDrawing = true, 
    this.textVal, 
    this.activeObj;
  }

  /** draw polyline methods */
  makeRoof(roofPoints, callback) {
      let left = this.findLeftPaddingForRoof(roofPoints)
      let top = this.findTopPaddingForRoof(roofPoints)
      roofPoints.push(new Point(roofPoints[0].x, roofPoints[0].y))
      callback('polyline', { roofPoints : roofPoints, left: left, top: top });
  }

  findTopPaddingForRoof(roofPoints) {
      let result = 999999;
      for(let f = 0; f < this.lineCounter; f++) {
          if(roofPoints[f].y < result) {
              result = roofPoints[f].y;

          }
      }
      return Math.abs(result)
  }

  findLeftPaddingForRoof(roofPoints) {
      let result = 999999;
      for(let i = 0; i < this.lineCounter; i++) {
          if(roofPoints[i].x < result) {
              result = roofPoints[i].x
          }
      }
      return Math.abs(result)
  }


  /** Creates canvas after component has mounted */
  componentDidMount() {
    const canvas = new fabric.Canvas(this.c)
    console.log(img)
    var baseurl = "."
    console.log(baseurl + img)
    console.log(`${baseurl + img}`)
    var rect = this.rect;
    var ellipse = this.ellipse;
    var isDown = this.isDown;
    var origX = this.origX;
    var origY = this.origY;
    var freeDrawing =this.freeDrawing;
    var textVal = this.textVal;
    var activeObj = this.activeObj; 
 

    fabric.Image.fromURL(`${img}`, function(img) {

      canvas.setHeight(img.height);
      canvas.setWidth(img.width);
      // add background image
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
        scaleX: canvas.width / img.width,
        scaleY: canvas.height / img.height
      });
    });



    const switch_functions = (type, oldFunction, newFunction, callback) => {
      canvas.off(type, oldFunction)
      callback(type, newFunction)
    }


    /** Canvas event on wheel-scroll for zooming **/
    const mouse_wheel = (options) => {
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
    canvas.on('mouse:wheel', mouse_wheel)


  


    /** on dobble click on the background or active object to toggle popup, listener temporary removed when drawing polygon */
    const oldDobbleClick = (options) => {
      let activeObject = canvas.getActiveObject();
      console.log(activeObject)
      if(activeObject === null || activeObject === undefined) {
        this.togglePopup('BG')
      } else {
        this.togglePopup(activeObject.id)
      }
    }
    canvas.on('mouse:dblclick', oldDobbleClick)


    /** POLYLINE LISTENERS */

    /** new dobble click, activated on drawing polygon and used to end the drawing */
    const newDobbleClick = (options) => {
      if(this.roofPoints[0] !== undefined && this.roofPoints[0] !== null) {
        this.drawingObject.type = '';
        this.lines.forEach((value, index, ar) => {
          canvas.remove(value);
        })    
        this.makeRoof(this.roofPoints, (type, roof) => {
          this.roofPoints = []
          this.lines = []
          this.lineCounter = 0;
          this.props.addNewObject(type, roof)
        });

      } else {
        switch_functions('mouse:dblclick', newDobbleClick, oldDobbleClick, (type, newFunction) => {
          canvas.on(type, newFunction)
        })
      }
      canvas.renderAll()
      this.setState({ canvas })
    }

    
    /** used to get mouse coordinates when drawing polygon */
    const getMouseCoordinates = (options) => {
      var pointer = canvas.getPointer(options.e);
      var px = pointer.x;
      var py = pointer.y;

      return [px, py]
    }

    const generateUUID = () => {
	    var d = new Date().getTime();
	    if(window.performance && typeof window.performance.now === "function"){
	        d += performance.now(); //use high-precision timer if available
	    }
	    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uuid;
	  }

    /** used to to set line start x and y to current mouse coordinates  */
    const setStartingPoint = (options) => {
      const offsetTop = this.c.offsetTop;
      const offsetLeft = this.c.offsetLeft;
      const values  = getMouseCoordinates(options)
      this.x = values[0] - offsetTop; 
      this.y = values[1] - offsetLeft;
    }


    /** returns behaviour if polygon is being drawn, used to draw lines */
    const mouse_down = (options) => {
      options.e.preventDefault();
      options.e.stopPropagation();

  
      if(freeDrawing) {
        isDown = true;
        canvas.selection = false;
        var pointer = canvas.getPointer(options.e)
        origX = pointer.x;
        origY = pointer.y;

        if(this.drawingObject.type === "ellipse"){
          ellipse = new fabric.Ellipse({
            left: origX,
            top: origY,
            originX: 'left',
            originY: 'top',
            rx: pointer.x - origX,
            ry: pointer.y - origY,                
            angle: 0,
            fill: '',
            stroke: 'orange',
            strokeWidth:6,
            type : 'ellipse',
            id : canvas.getObjects().length+1 ,
          });
          canvas.add(ellipse)
          activeObj = ellipse;
        }

        if(this.drawingObject.type === "rect") {
          rect = new fabric.Rect({
            left: origX,
			      top: origY,
			      width: pointer.x-origX,
			      height: pointer.y-origY,
			      fill: '',
		        stroke : 'red',
		        type : 'rect',
		        id : canvas.getObjects().length+1,
		        strokeWidth: 5,
          });
          canvas.add(rect);
          activeObj = rect;
        }
        if (this.drawingObject.type === "roof") {
          canvas.selection = false;
          setStartingPoint(options);
          this.roofPoints.push(new Point(this.x, this.y));
          var points = [this.x, this.y, this.x, this.y];
          this.lines.push(new fabric.Line(points, {
              strokeWidth: 3,
              selectable: false,
              stroke: 'red'
          }))
          canvas.add(this.lines[this.lineCounter]);
          this.lineCounter++;
          canvas.on('mouse:up', function (options) {
              canvas.selection = true;
          });
        }
      }
    }
    canvas.on('mouse:down', mouse_down)


    /** runs when mouse moves, returns behaviour if polygon is being drawn */
    const mouse_move = (options) => {
      options.e.preventDefault();
      options.e.stopPropagation();

      if(isDown && freeDrawing) {
        var pointer = canvas.getPointer(options.e);

        if(this.drawingObject.type === 'ellipse') {
          if(ellipse === null || ellipse === undefined) { return; }
        
          var rx = Math.abs(origX - pointer.x)/2;
          var ry = Math.abs(origY - pointer.y)/2;
          if(rx > ellipse.strokeWidth) {
            rx += ellipse.strokeWidth/2
          }
          if(ry > ellipse.strokeWidth) {
            ry += ellipse.strokeWidth/2
          }

          ellipse.set({ rx: rx, ry: ry })

          if( origX > pointer.x ) {  
            ellipse.set({ originX: 'right'}) 
          } else if( origX > pointer.x ) {  
            ellipse.set({ originX: 'left'}) 
          }
          if( origY > pointer.y ) {  
            ellipse.set({ originY: 'bottom'}) 
          } else if( origY > pointer.y ) {  
            ellipse.set({ originY: 'top'}) 
          }
        } 
        if(this.drawingObject.type === 'rect') {
          
          if(origX > pointer.x) {
            rect.set({ left: Math.abs(pointer.x) })
          }
          if(origY > pointer.y) {
            rect.set({ top: Math.abs(pointer.y) })
          }

          rect.set({ width: Math.abs(origX - pointer.x) });
		      rect.set({ height: Math.abs(origY - pointer.y) });
        }

        canvas.renderAll();
      }

      if (this.lines[0] !== null && this.lines[0] !== undefined && this.drawingObject.type == "roof") {
        console.log('mouse:move')  
        setStartingPoint(options);
        this.lines[this.lineCounter - 1].set({
          x2: this.x,
          y2: this.y
        });
      canvas.renderAll();
      }

    }
    canvas.on('mouse:move', mouse_move)


    const mouse_up = (options) => {
      options.e.preventDefault();
      options.e.stopPropagation();
      if(freeDrawing) {
        console.log('mouse:up')
        isDown = false;
        if(this.drawingObject.type === 'ellipse') {
          console.log(ellipse)
          canvas.remove(ellipse)
          this.freeDrawing = false;
          this.drawingObject.type = ''
          this.props.addNewObject('ellipse', {

          })
        } else if( this.drawingObject.type === 'rect') {
          console.log(ellipse)
          canvas.remove(rect)
          this.freeDrawing = false;
          this.drawingObject.type = ''
          this.props.addNewObject('rect', {

          })
        }
          
      }
      canvas.selection = true;
      
      var objs = canvas.getObjects();
      for(var i = 0; i < objs.length; i++) {
        objs[i].setCoords()
      }

    }
    canvas.on('mouse:up', mouse_up)


    const object_modified = (options) => {
      try {
        var obj = options.e.target;
        if(obj.type = 'ellipse') {
          obj.rx *= obj.scaleX;
          obj.ry *= obj.scaleY;
        }
      } catch(error) { console.log(error) }
    } 
    canvas.on("object:modified", object_modified)


    /** changes dobble click function from selecting objects to ending current polygon */
    const object_added = (options) => {
      
    } 
    canvas.on("object:added", object_added)

    /** runs before canvas has rendered */
    const before_render = (options) => {

    }
    canvas.on('before:render', before_render)

    /** runs after canvas has rendered */
    const after_render = (options) => {
      canvas.calcOffset();
    }
    canvas.on("after:render", after_render)

    this.setState({ canvas })
  }

  render() {

    const annotation = this.props.annotation;
    const annotations = this.props.annotations;


    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      })
    })

    return (
      <Fragment >
        <div className="canvas_btns" id="canvas_btns_upper">
          <button className="canvas_btn" 
            onClick={this.prevAnnotation.bind()}
            disabled={annotation.index === 0}
          ><p className="canvas_btn_p">PREV</p></button>
          <button className="canvas_btn"
            onClick={this.nextAnnotation.bind()}
            disabled={annotation.index === annotations.length - 1}
          ><p className="canvas_btn_p">NEXT</p></button>
        </div>

        <div className="canvas_shape_menu">
          <div className="editor_shape_menu">
            <button className="editor_shape_option" value="rect" onClick={this.startRect.bind(this)} >
              <p className="editor_shape_option_p" value="rect"> RECTANGLE </p>
            </button>
            <button className="editor_shape_option" value="circle" onClick={this.addNewObject.bind(this)} >
              <p className="editor_shape_option_p" value="circle"> CIRCLE </p>
            </button>
            <button className="editor_shape_option" value="ellipse" onClick={this.startEllipse.bind(this)} >
              <p className="editor_shape_option_p" value="ellipse"> ELLIPSE </p>
            </button>
            <button className="editor_shape_option" value="polyline" onClick={this.startPolyline.bind(this)} id="editor_shape_option_right" >
              <p className="editor_shape_option_p" value="polyline" > POLYLINE </p>
            </button>
          </div>
        </div>

        <p className="annotation_id_p" >{annotation.index}</p>

        <canvas ref={c => (this.c = c)} width={500} height={500} style={{
          outline: 'black 3px solid'
        }} />
        { this.state.canvas && children }


        { this.state.show_popup ? 
          <PopupComponent
            current_area={this.state.popup_current_area}
            closePopup={this.togglePopup.bind(this)}
            addNewToGlobalAnnotations={this.addNewToGlobalAnnotations.bind(this)}
          />
          : null
        }
        <div className="canvas_btns" id="canvas_btns_bottom">
          <button className="canvas_btn" onClick={this.previewCurrentObjectsJSON.bind(this)}>
            <p className="canvas_btn_p">PREVIEW JSON</p>
          </button>
          <button className="canvas_btn" onClick={this.removeSelectedObject.bind(this)}>
            <p className="canvas_btn_p">REMOVE SELECTED</p>
          </button>
          <button className="canvas_btn" onClick={this.resetZoomOnCanvas.bind(this)}>
            <p className="canvas_btn_p">RESET ZOOM</p>
          </button>
          <img src={require(`${baseurl + img}`)}/>
        </div>
      </Fragment>
    )
  }

  /** */
  startEllipse(e) {
    if (this.drawingObject.type === "ellipse") {
      this.drawingObject.type = "";
    }
    this.drawingObject.type = "ellipse";
    this.freeDrawing = true;
    console.log(this.drawingObject)
  }

  startRect(e) {
    if (this.drawingObject.type === "rect") {
      this.drawingObject.type = "";
    }
    this.drawingObject.type = "rect";
    this.freeDrawing = true;
    console.log(this.drawingObject)
  }


  /** **/
  startPolyline(e) {
    if (this.drawingObject.type == "roof") {
      let canvas = this.state.canvas;
      this.drawingObject.type = "";
      this.lines.forEach(function(value, index, ar){
          canvas.remove(value);
      });
      this.makeRoof(this.roofPoints, (type, roof) => {
        this.roofPoints = []
        this.lines = []
        this.lineCounter = 0;
        this.props.addNewObject(type, roof)
      });
      canvas.renderAll()
      this.setState({ canvas })
    } else {
      this.drawingObject.type = "roof";
    }

  }

  /** **/
  addNewObject(e) {
    e.preventDefault()
    this.props.addNewObject(e.target.getAttribute('value'))
  }

  /** **/
  resetZoomOnCanvas(e) {
    let canvas = this.state.canvas;
    canvas.setViewportTransform([1,0,0,1,0,0]);
    this.setState({ canvas: canvas }) 
  }

  /** Display json of current shapes/annotations */
  previewCurrentObjectsJSON(e) {
    e.preventDefault()
    console.log(this.state.canvas.toJSON())
    this.props.previewJsonInWrapper(this.state.canvas.toJSON())
  }

  /** Remove selected shape from canvas */
  removeSelectedObject(e) {
    e.preventDefault()
    let canvas = this.state.canvas;
    let activeObject = canvas.getActiveObject()
    this.removeObjectsFromCanvas(canvas, [activeObject], () => {
      this.props.removeObjectFromState(activeObject['id'])
    })

  }

  nextAnnotation(e) {
    e.preventDefault()
    let canvas = this.state.canvas;
    let objects = canvas.getObjects()
    this.removeObjectsFromCanvas(canvas, objects, () => {
      this.props.nextAnnotation()
    })

  }

  prevAnnotation(e) {
    e.preventDefault()
    let canvas = this.state.canvas;
    let objects = canvas.getObjects()
    this.removeObjectsFromCanvas(canvas, objects, () => {
      this.props.prevAnnotation()
    })

  }

  removeObjectsFromCanvas(canvas, objects, callback) {
    objects.forEach(object => {
      canvas.remove(object)
    })
    callback()
  }

  /** Show popup on shape selection */
  togglePopup(...args) {
    const annotation = this.props.annotation;
  
    if(this.state.popup_current_area !== undefined) {
      this.setState((state, props) => ({
        show_popup: !state.show_popup,
        popup_current_area: undefined,
        popup_current_id: undefined
      })
    )} else if(args[0] === 'BG') { 
      this.setState((state, props) => ({
        show_popup: !state.show_popup,
        popup_current_area: annotation.file_properties,
        popup_current_id: 'BG'
      }))
    } else {
      const id = args[0];
      if(id > annotation.areas.length - 1) {
        const area = { 
          shape_attribute: {},
          shape_properties: {
            what: "",
            type: "",
            quality_remarks: {
              clear_view: null,
              well_illuminated: null 
            }
          }
        }
        this.setState((state) => ({
          show_popup: !state.show_popup,
          popup_current_area: area,
          popup_current_id: id
        }))
      } else {
        const area = annotation.areas[id]
        this.setState((state) => ({
          show_popup: !state.show_popup,
          popup_current_area: area,
          popup_current_id: id
        }))
      }
    }
  }

  addNewToGlobalAnnotations(newAnnotation) {
    const currentAnnotation = this.props.annotation;
    const currentShapeId = this.state.popup_current_id;
    let currentCanvasObject = {};
    this.state.canvas.getObjects().forEach((object) => {
      if(object.id === currentShapeId) {
        currentCanvasObject = object;
      }
    })
    if(newAnnotation.filename !== undefined && newAnnotation.filename !== null) {
      this.props.addDescriptionToGlobalAnnotation(currentAnnotation, newAnnotation)
    } else {
      this.props.addAreaToGlobalAnnotation(currentAnnotation, newAnnotation, currentCanvasObject)
    }
  }
  

}


/** Unused **/
function mapStateToProps(state, props) {
  return {};
}

/** Unused **/
const mapDispatchToProps = (dispatch) => ({
  addAreaToGlobalAnnotation: bindActionCreators(addAreaToGlobalAnnotation, dispatch),
  addDescriptionToGlobalAnnotation: bindActionCreators(addDescriptionToGlobalAnnotation, dispatch)
})

FabricContainer.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
};

FabricContainer.defaultProps = {
    width: 600,
    height: 400,
};



export default connect(mapStateToProps, mapDispatchToProps)(FabricContainer);


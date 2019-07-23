import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { fabric } from 'fabric'
import PropTypes from 'prop-types';

import FabricContainer from '../FabricComponent/FabricContainer.js';
import Rectangle from '../FabricComponent/Rectangle';

import OptionMenu from '../HelperComponents/OptionMenu';
import TextAreaComponent from '../HelperComponents/TextAreaComponent';
import Polygon from '../FabricComponent/Polygon.js';
import Ellipse from '../FabricComponent/Ellipse.js';

import { removeAreaFromGlobalAnnotation } from '../../Actions/removeAreaFromGlobalAnnotation'

import { getAbsolutePosition } from '../../Components/resources/getAbsolutePosition'
import { addCurrentFileAction } from '../../Actions/addCurrentFileAction';
import PreviewComponent from '../HelperComponents/PreviewComponent.js';


class WrapperComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentObjects: [],
            oldObjects: [],
            showcase_object: undefined,
            annotations: this.props.global_annotations,
            annotation: undefined,
            files: this.props.global_files,
            file: this.props.global_files[0],
            concepts: this.props.concepts,
            concept_types: this.props.concept_types,
            isLoading: false,
        
            errors: {}

        }
        this.removeObjectFromState = this.removeObjectFromState.bind(this)
        this.previewJsonInWrapper = this.previewJsonInWrapper.bind(this)
        this.addNewObject = this.addNewObject.bind(this)
        this.nextAnnotation = this.nextAnnotation.bind(this)
        this.prevAnnotation = this.prevAnnotation.bind(this)

    }

    componentWillMount() {
        
        if(this.props.currentFile === undefined && this.props.global_files[0] !== undefined) {
            this.props.addCurrentFileAction(0)
        }

        if(this.props.currentFile !== undefined) {

            const nIndex = this.props.currentFile
        
            this.checkIfCurrentAnnotationExists(nIndex, (exists, annoIndex) => {
                
               

                if(exists) {
                    this.setState({ annotation : this.state.annotations[annoIndex], file: this.state.files[nIndex], currentObjects: [] }, () => {
                    
                        this.updateCurrentObjects()
                    })

                } else {
                    this.setState({ annotation: { 
                    index: 'temp', 
                    local_id: this.state.files[nIndex].local_id, 
                    file_properties: {
                        what: '',
                        type: '',
                        filename: this.state.files[nIndex].filename,
                        short_description: ''
                    }, 
                    areas: [] 
                    }, file: this.state.files[nIndex], currentObjects: [] }, () => {
                    
                        this.updateCurrentObjects()
                    })
                }

            }) 
        }

    }

    updateCurrentObjects() {
        const { annotation } = this.state;
        //  Are there currently any annotations?
        if(annotation !== undefined && annotation.areas !== undefined)  {
            if(annotation.areas.length >= 1) {
                this.addExistingObject(annotation.areas)
                        
            }
        }
 
    }       

    /** unused for validation **/
    isValid(data) {
        const isValid = false;
        if(!isValid) {
            this.setState({errors : errors })
        } else {
            return isValid
        }
    }

    checkIfCurrentAnnotationExists(index, callback) {

        const annotations = this.state.annotations;
        if(annotations.length >= 1) {

            let files = this.state.files;
       
            let oIndex = annotations.findIndex(anno => anno.local_id === files[index].local_id)

            if(oIndex !== -1) {
                callback(true, oIndex)
            } else { callback(false, 0) }

        } else {
            callback(false, 0)
        }
        
    }

    nextAnnotation = () => {
        const nIndex = this.state.file.index + 1;
    
        this.checkIfCurrentAnnotationExists(nIndex, (exists, annoIndex) => {
            
            // update redux current file
            this.props.addCurrentFileAction(nIndex)
    
            if(exists) {
                this.setState({ annotation : this.state.annotations[annoIndex], file: this.state.files[nIndex], currentObjects: [] }, () => {
                 
                    this.updateCurrentObjects()
                })

            } else {
                this.setState({ annotation: { 
                index: 'temp', 
                local_id: this.state.files[nIndex].local_id, 
                file_properties: {
                    what: '',
                    type: '',
                    filename: this.state.files[nIndex].filename,
                    short_description: ''
                }, 
                areas: [] 
                }, file: this.state.files[nIndex], currentObjects: [] }, () => {
                 
                    this.updateCurrentObjects()
                })
            }

        }) 

    }
  
    prevAnnotation = () => {
        const nIndex = this.state.file.index - 1;
     
        this.checkIfCurrentAnnotationExists(nIndex, (exists, annoIndex) => {

            // update redux current file
            this.props.addCurrentFileAction(nIndex)
               
                if(exists) {
                    this.setState({ annotation : this.state.annotations[annoIndex], file: this.state.files[nIndex], currentObjects: [] }, () => {
               
                        this.updateCurrentObjects()
                    })
    
                } else {
                    this.setState({ annotation: { 
                        index: 'temp', 
                        local_id: this.state.files[nIndex].local_id, 
                        file_properties: {
                            what: '',
                            type: '',
                            filename: this.state.files[nIndex].filename,
                            short_description: ''
                        }, 
                        areas: [] 
                    }, file: this.state.files[nIndex], currentObjects: [] }, () => {

                        this.updateCurrentObjects()
                    })
                }
            
        })
    }

    render() { 
        const errors = this.state.errors;
        let { annotations, annotation, files, file, concepts, concept_types, currentObjects } = this.state;

        if(annotation === undefined && file === undefined) {
            annotation = { index: 0, local_id: 'anno_temp', file_properties: {}, areas: [] }
        } else if (annotation === undefined && file !== undefined) {
            annotation = { 
                index: 'temp', 
                local_id: file.local_id, 
                file_properties: {
                    what: '',
                    type: '',
                    filename: file.filename,
                    short_description: ''
                }, 
                areas: [] 
            }
        }


        if(file === undefined) {
            file = { index: 0, local_url : 0, local_id: 'file_temp' }
        }
   
        return (
            <div className="wrapper_component">
                
                <div className="wrapper_component_inner" >
                <div className="settings_menu_upper">
                    <OptionMenu listitems={{
                            btn_type: 'OVERVIEW',
                            items: [{item: 'App data overview', destination: '/overview'}]
                        }} 
                    />
                    <OptionMenu listitems={{
                            btn_type: 'EMPTY',
                            items: [{item: 'Empty', destination: '/'}]
                        }} 
                    />
                    <OptionMenu listitems={{
                            btn_type: 'CONCEPTS',
                            items: [{item: 'Load concepts', destination: '/upload_concepts'}]
                        }}
                    />
                    <OptionMenu listitems={{
                            btn_type: 'UPLOAD',
                            items: [{item: 'Upload image', destination: '/upload' }]
                        }} 
                    />
                    <OptionMenu listitems={{
                            btn_type: 'EXPORT',
                            items: [{item: 'Export to file', destination: '/export'}]
                        }} 
                    />
                </div>
                
                <div className="editor_menu_lower">
               
                    <div className="editor_window_right">
                        <FabricContainer
                            file={file}
                            files={files}
                            concepts={concepts}
                            concept_types={concept_types} 
                            annotation={annotation}
                            annotations={annotations}
                            addNewObject={this.addNewObject.bind(this)} 
                            removeObjectFromState={this.removeObjectFromState.bind(this)}
                            prevAnnotation={this.prevAnnotation.bind(this)}
                            nextAnnotation={this.nextAnnotation.bind(this)}
                            previewJsonInWrapper={this.previewJsonInWrapper.bind(this)}
                            >
                         {currentObjects.map((item) => { return item}) }
                        </FabricContainer>
                    </div>
                    
                </div>
                
            </div>
                <div className="editor_window_bottom" >
                    {
                    this.state.showcase_object !== undefined && this.state.showcase_object !== null
                    ?
                    <PreviewComponent
                        preview={this.state.showcase_object}
                    /> : null
                    }
                </div>

            </div>
        );
    }
    
    /** used to display json preview of annotations, sets state of component **/
    previewJsonInWrapper(json_preview) {
        
        let active = json_preview._objects[0]
        let preview = {}

        if(active.type === "rect") {
            let point = getAbsolutePosition(active, 'point')
            preview = {
                type: active.type,
				x: point.x,
				y: point.y,
				width: (active.width * active.group.scaleX),
				height: (active.height * active.group.scaleY),
				id: active.id,
            }

        } else if( active.type === "ellipse") {
            let point = getAbsolutePosition(active, 'point')
            preview = {
                type: active.type,
				x: point.x,
				y: point.y,
				rx: (active.rx * active.group.scaleX),
				ry: (active.ry * active.group.scaleY),
				originX: active.originX,
				originY: active.originY,
				id: active.id,
            }

        } else {
            if((active.group.scaleX <  1 || active.group.scaleX > 1) || (active.group.scaleY > 1 || active.group.scaleY < 1)) {
                let matrix = active.calcTransformMatrix();
                active.points = active.points.map((point) => {			
                    return new fabric.Point(
                        point.x - active.pathOffset.x,
                        point.y - active.pathOffset.y);
                }).map((point) => {			
                    return fabric.util.transformPoint(point, matrix);
                })
            }
            preview = {
                type: active.type,
				all_points: active.points,
				width: (active.width * active.group.scaleX),
				height: (active.height * active.group.scaleY),
				id: active.id,
            }

        }
        this.setState({ showcase_object: preview })
    } 


    removeFromCurrentObjects(id){
        let currentObjects = this.state.currentObjects
        let counter = 0;
        for (let i = 0; i <= currentObjects.length - 1; i++) {
           
            if(currentObjects[i].props.id === id) {

                currentObjects.splice(i, 1)
                counter = i;
            } 
        }
        return counter;
    }

    

    /** used to remove object/shape from component state **/
    removeObjectFromState(id, local_id) {
       // const object_position  = this.removeFromCurrentObjects(id)

       // console.log('[{+}] object position : ' + object_position)

        this.props.removeAreaFromGlobalAnnotation(id, local_id)
    }

    /** Adds a new shape to the canvas **/
    addNewObject(...args) {
        const which = args[0]
        let data= {}
        if(args.length > 1) {
            data = args[1] 
        }
        let ncurrentObjects = this.state.currentObjects;
        let currSize = ncurrentObjects.length;
        switch(which) {
            case "rect":
                ncurrentObjects.push(<Rectangle key={currSize} 
                    id={data.id} 
                    top={data.top} 
                    left={data.left} 
                    width={data.width} 
                    height={data.height}
                    />)
                break;
            case "ellipse":
                ncurrentObjects.push(<Ellipse key={currSize} 
                    id={data.id} 
                    top={data.top} 
                    left={data.left} 
                    rx={data.rx} 
                    ry={data.ry}
                    originX={data.originX}
                    originY={data.originY}
                      />)
                break;
            case "polyline":
                ncurrentObjects.push(<Polygon key={currSize} 
                    id={data.id} 
                    points={data.roofPoints} 
                    />) 
                break;
            default:
                break;
        }
        this.setState({
            currentObjects: ncurrentObjects
        })
    }

    addExistingObject(areas) {

        let ncurrentObjects = this.state.currentObjects;
        let counter = 0;
        areas.forEach(area => {
            const { shape_attribute, shape_properties } = area;
            let which = shape_attribute.type;
            switch(which) {
                case "rect":    
                    ncurrentObjects.push(<Rectangle key={counter} id={shape_attribute.id} 
                        top={shape_attribute.y}
                        left={shape_attribute.x}
                        width={shape_attribute.width} 
                        height={shape_attribute.height} 
                        text_content={shape_properties.what}
                         />)
                        
                    break;
                case "ellipse":
                    ncurrentObjects.push(<Ellipse key={counter} id={shape_attribute.id} 
                        top={shape_attribute.y} 
                        left={shape_attribute.x} 
                        rx={shape_attribute.rx} 
                        ry={shape_attribute.ry} 
                        originX={shape_attribute.originX}
                        originY={shape_attribute.originY}
                        text_content={shape_properties.what}   
                        />
                    )
                    break;
                case "polyline":
                    ncurrentObjects.push(<Polygon key={counter} id={shape_attribute.id} 
                        points={shape_attribute.all_points}
                        width={shape_attribute.width}
                        height={shape_attribute.height}
                        text_content={shape_properties.what}
                         />
                        )
                    break;
                default:
                    break;
            }
            counter+=1;
        })
        this.setState({
            currentObjects: ncurrentObjects
        })
    }
}


/** wrap global annotations to local component **/
function mapStateToProps(state, props) {
    return {
        global_annotations: state.annotations.annotations,
        global_files: state.files.files,
        currentFile: state.currentFile.currentFile,
        
        concepts: state.concepts.concepts,
        concept_types: state.concept_types.concept_types
    };
}

/** required actions **/
const mapDispatchToProps = (dispatch) => ({
    removeAreaFromGlobalAnnotation: bindActionCreators(removeAreaFromGlobalAnnotation, dispatch),
    addCurrentFileAction: bindActionCreators(addCurrentFileAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WrapperComponent);
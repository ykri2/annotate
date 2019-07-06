import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import FabricContainer from '../FabricComponent/FabricContainer.js';
import Rectangle from '../FabricComponent/Rectangle';

import OptionMenu from '../HelperComponents/OptionMenu';
import TextAreaComponent from '../HelperComponents/TextAreaComponent';
import Polygon from '../FabricComponent/Polygon.js';
import Ellipse from '../FabricComponent/Ellipse.js';

import { removeAreaFromGlobalAnnotation } from '../../Actions/removeAreaFromGlobalAnnotation'


class WrapperComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentObjects: [],
            oldObjects: [],
            showcase_annotations: [],
            annotations: this.props.global_annotations,
            annotation: this.props.global_annotations[0],
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
        this.updateCurrentObjects()
    }

    updateCurrentObjects() {
        const { annotation, currentObjects } = this.state;
        //  Are there currently any annotations?
        if(annotation !== undefined) {
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

    nextAnnotation = () => {
        const nIndex = this.state.annotation.index + 1;
        this.setState({ annotation : this.state.annotations[nIndex], currentObjects: [] }, () => {
            this.updateCurrentObjects()
        })
    }
  
    prevAnnotation = () => {
        const nIndex = this.state.annotation.index - 1;
        this.setState({ annotation : this.state.annotations[nIndex], currentObjects: [] }, () => {
          this.updateCurrentObjects()
      })
    }

    render() { 
        const errors = this.state.errors;
        const { annotations, annotation, currentObjects } = this.state;

        return (
            <div className="wrapper_component">
                
                <div className="wrapper_component_inner" >
                <div className="settings_menu_upper">
                    <OptionMenu listitems={{
                            btn_type: 'ANNOTATIONS',
                            items: ['All annotations','Annotations by picture', 'Get image with annotations']
                        }} 
                    />
                    <OptionMenu listitems={{
                            btn_type: 'DISPLAY',
                            items: ['Canvas','Image list', 'Summary']
                        }} 
                    />
                    <OptionMenu listitems={{
                            btn_type: 'SOMETHING',
                            items: ['loading...']
                        }}
                    />
                    <OptionMenu listitems={{
                            btn_type: 'UPLOAD',
                            items: ['Upload image']
                        }} 
                    />
                    <OptionMenu listitems={{
                            btn_type: 'EXPORT',
                            items: ['Export to .json','Export to .csv']
                        }} 
                    />
                </div>
                
                <div className="editor_menu_lower">
                    <div className="editor_menu_left">
                        <button className="editor_side_option" ><p className="editor_side_option_p"> OVERVIEW </p></button>
                        <button className="editor_side_option" ><p className="editor_side_option_p"> SHORTCUTS </p></button>
                        <button className="editor_side_option" ><p className="editor_side_option_p"> ? </p></button>
                        <button className="editor_side_option" ><p className="editor_side_option_p"> ? </p></button>
                        <button className="editor_side_option" ><p className="editor_side_option_p"> ? </p></button>
                    </div>
               
                    <div className="editor_window_right">
                        <FabricContainer 
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
                <div className="editor_window_bottom" >
                    {
                    this.state.showcase_annotations.length >= 1
                    ?
                    <TextAreaComponent 
                        rows={"8"} 
                        cols={"140"}
                        placeholder={"preview output"}
                        content={this.state.showcase_annotations}
                    /> : null
                    }
                </div>
            </div>

            </div>
        );
    }
    
    /** used to display json preview of annotations, sets state of component **/
    previewJsonInWrapper(json_preview) {
        const annotations = json_preview.objects;
        this.setState({ showcase_annotations: annotations })
    }

    /** used to remove object/shape from component state **/
    removeObjectFromState(id) {
        let currentObjects = this.state.currentObjects
        currentObjects.forEach(obj => {
            if(obj.props.id === id) {
                currentObjects.splice(id - 1, 1)
            }
        });
        this.setState({ currentObjects: currentObjects })
        if(id <= this.state.annotation.areas.length - 1) {
            this.props.removeAreaFromGlobalAnnotation(this.state.annotation.index, id)
        }
    }

    /** Adds a new shape to the canvas **/
    addNewObject(...args) {
        const which = args[0]
        let polydata = {}
        if(args.length > 1) {
            polydata = args[1] 
        }
        let ncurrentObjects = this.state.currentObjects;
        let currSize = ncurrentObjects.length;
        switch(which) {
            case "rect":
                ncurrentObjects.push(<Rectangle key={currSize} id={currSize} top={150} left={300} width={150} height={150} fill={"transparent"} />)
                break;
            case "ellipse":
                ncurrentObjects.push(<Ellipse key={currSize} id={currSize} top={150} left={300} rx={150} ry={100} fill={"transparent"} />)
                break;
            case "polyline":
                ncurrentObjects.push(<Polygon key={currSize} id={currSize} fill={"transparent"} 
                    points={polydata.roofPoints} 
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
                    ncurrentObjects.push(<Rectangle key={counter} id={counter} 
                        top={shape_attribute.y} 
                        left={shape_attribute.x} 
                        width={shape_attribute.width} 
                        height={shape_attribute.height} 
                        fill={"transparent"} />
                    )
                    break;
                case "ellipse":
                    ncurrentObjects.push(<Ellipse key={counter} id={counter} 
                        top={shape_attribute.y} 
                        left={shape_attribute.x} 
                        rx={shape_attribute.rx} 
                        ry={shape_attribute.ry} 
                        fill={"transparent"} />
                    )
                    break;
                case "polyline":
                    ncurrentObjects.push(<Polygon key={counter} id={counter} 
                        points={shape_attribute.all_points}
                        width={shape_attribute.width}
                        height={shape_attribute.height}
                        fill={"transparent"} />
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
    };
}

/** unused **/
const mapDispatchToProps = (dispatch) => ({
    removeAreaFromGlobalAnnotation: bindActionCreators(removeAreaFromGlobalAnnotation, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(WrapperComponent);
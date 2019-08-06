import React, { Component } from 'react';

import PropTypes from 'prop-types'


/** 
 * Preview component 
 * used to display current active object on canvas
 * only displays canvas object information and not information on what the shape contains
 **/
class PreviewComponent extends Component {
  constructor(props){
    super(props);

  }

  renderPreview(preview) {
      if(preview.preview.type === "rect") {
        return (
            <div className="preview_innerwrapper">
                <p className="preview_p" >{'{'}  
                type :  <span className="dataspan" >{ preview.preview.type }</span>  ,
                x (left) :  <span className="dataspan" >{ preview.preview.x }</span>  ,
                y (top) :  <span className="dataspan" >{ preview.preview.y }</span>  ,
                width :  <span className="dataspan" >{ preview.preview.width }</span>  ,
                height :  <span className="dataspan" >{ preview.preview.height }</span>   {'}'} 
                </p>                    
            </div>
            )
      } else if(preview.preview.type === "ellipse") {
        return (
            <div className="preview_innerwrapper">
                <p className="preview_p" >{'{'}   
                type :  <span className="dataspan" >{ preview.preview.type }</span>  ,
                x (left) :  <span className="dataspan" >{ preview.preview.x }</span>  ,
                y (top) :  <span className="dataspan" >{ preview.preview.y }</span>  ,
                rx :  <span className="dataspan" >{ preview.preview.rx }</span>  ,
                ry :  <span className="dataspan" >{ preview.preview.ry }</span>  ,
                originX :  <span className="dataspan" >{ preview.preview.originX }</span>  , 
                originY :  <span className="dataspan" >{ preview.preview.originY }</span>   {'}'} 
                </p>                    
            </div>
        )
      } else {
        return (
            <div className="preview_innerwrapper">
                <p className="preview_p" >{'{'}   
                type :  <span className="dataspan" >{ preview.preview.type }</span>  ,
                points (total) :  <span className="dataspan" >{ preview.preview.all_points.length }</span>  ,
                width :  <span className="dataspan" >{ preview.preview.width }</span>  ,
                height :  <span className="dataspan" >{ preview.preview.height }</span>   {'}'}
                </p>                    
            </div>
        )
      }
  }

  render() {
    const preview = this.props;

    return (
        <div className="preview_component">
            
            { preview !== undefined ? this.renderPreview(preview) : none }

        </div>
        )
    }
}


/** must-have props for preview */
PreviewComponent.propTypes = {

};

/** must-have default prop values for preview */
PreviewComponent.defaultProps = {

}

export default PreviewComponent
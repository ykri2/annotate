import React from 'react'
import PropTypes from 'prop-types'

import { fabric } from 'fabric';



/**
 * React+Fabric component
 * Creates Polygon shapes
 **/


 
class Polygon extends React.Component {
    constructor(props){
        super(props);
    

        
    }
 
    
    componentDidMount() {
        let polygon = new fabric.Polyline(this.props.points, {
            fill: this.props.fill,
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth,
        })
        polygon.set({ 
            id: this.props.id,

            lockRotation: this.props.lockRotation,
        })
        if((this.props.width !== undefined && this.props.width !== null) && (this.props.height !== undefined && this.props.height !== null)) 
        {
            polygon.set({
                width: this.props.width,
                height: this.props.height
            })
        }

      
        /** add text element to the polygon */
        let text = new fabric.Text(this.props.text_content.toUpperCase(), {
            fontSize: this.props.fontSize,
            fontFamily: 'Helvetica',
            fill: this.props.stroke,
            stroke: 'black',
            strokeWidth: this.props.strokeWidth/10,
            top: this.props.points[0].y,
            left: this.props.points[0].x
        });

        /** add shape and corresponding text to group element */  
        let group = new fabric.Group([ polygon, text ], {
           
        });
          

        /** add group to canvas */
        this.props.canvas.add(group)
    }

    render() {
        return null
    }




}

Polygon.propTypes = {
    canvas: PropTypes.object,
    lockRotation: PropTypes.bool.isRequired,
    points: PropTypes.array.isRequired,

    fill: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,

    id: PropTypes.string.isRequired

};

Polygon.defaultProps = {
    id: undefined,
    points: [],
    lockRotation: true,


    stroke: '#cd6133',
    strokeWidth: 5,
    fontSize: 20,
    fill:'transparent',

    text_content: 'undefined'
};



export default Polygon

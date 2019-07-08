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
        this.props.canvas.add(polygon)
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

    id: PropTypes.string.isRequired

};

Polygon.defaultProps = {
    id: undefined,
    points: [],
    lockRotation: true,


    stroke: '#cd6133',
    strokeWidth: 5,
    fill:'transparent'
};



export default Polygon

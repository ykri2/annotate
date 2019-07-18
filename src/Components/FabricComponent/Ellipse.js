import React from 'react'
import PropTypes from 'prop-types'

import { fabric } from 'fabric';


/**
 * React+Fabric component
 * Creates Ellipse shapes
 **/
class Ellipse extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
    
        }
    }

    componentDidMount() {
        const ellipse = new fabric.Ellipse({
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth,
            rx: this.props.rx,
            ry: this.props.ry,
            originX: this.props.originX,
            originY: this.props.originY,
            top: this.props.top,
            left: this.props.left,
            fill: this.props.fill,

            id: this.props.id
        })

        /** add text element to the ellipse */ 
        var text = new fabric.Text(this.props.text_content[0].toUpperCase(), {
            fontSize: this.props.fontSize,
            fontFamily: 'Helvetica',
            fill: this.props.stroke,
            stroke: 'black',
            strokeWidth: this.props.strokeWidth/10,
            top: this.props.top + (this.props.ry - (this.props.fontSize/3)),
            left: this.props.left + (this.props.rx - (this.props.fontSize/3))
        });

        /** add shape and corresponding text to group element */  
        var group = new fabric.Group([ ellipse, text ], {
 
        });
          

        /** add group to canvas */
        this.props.canvas.add(group)
    }

    render() {
        return null
    }
}
 
Ellipse.propTypes = {
    canvas: PropTypes.object,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    rx: PropTypes.number.isRequired,
    ry: PropTypes.number.isRequired,
    originX: PropTypes.string.isRequired,
    originY: PropTypes.string.isRequired,
    fill: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,

    id: PropTypes.string.isRequired
};

Ellipse.defaultProps = {
    id: undefined,
    top: 0,
    left: 0,
    rx: 100,
    ry: 70,
    text_content: 'undefined',
    originX: 'left',
    originY: 'top',
    stroke: '#cd6133',
    fontSize: 20,
    strokeWidth: 5,
    fill:'transparent'
};

 

export default Ellipse

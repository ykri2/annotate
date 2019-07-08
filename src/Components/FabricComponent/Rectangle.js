import React from 'react'
import PropTypes from 'prop-types'

import { fabric } from 'fabric';


/**
 * React+Fabric component
 * Creates Rectangle shapes
 **/
class Rectangle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
    
        }
    }

    componentDidMount() {
        const rect = new fabric.Rect(this.props)

        var text = new fabric.Text(this.props.text_content.toUpperCase(), {
            fontSize: this.props.fontSize,
            fontFamily: 'Helvetica',
            fill: this.props.stroke,
            stroke: 'black',
            strokeWidth: this.props.strokeWidth/10,
            top: this.props.top + (this.props.height/2 - (this.props.fontSize/3)),
            left: this.props.left + (this.props.width/2 - (this.props.fontSize/3) - 15),
        });
          
        var group = new fabric.Group([ rect, text ], {
           
        });
          


        this.props.canvas.add(group)
    }

    render() {
        return null
    }
}
 
Rectangle.propTypes = {
    canvas: PropTypes.object,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired,

    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired
};

Rectangle.defaultProps = {
    id: undefined,
    top: 0,
    left: 0,
    width: 50,
    height: 50,

    stroke: '#cd6133',
    strokeWidth: 5,
    fontSize: 20,
    fill:'transparent',
    text_content: 'undefined'
};



export default Rectangle

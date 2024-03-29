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
        const rect = new fabric.Rect({top: this.props.top,
            left: this.props.left,
            width: this.props.width,
            height: this.props.height,
            fill: this.props.fill,
            stroke: this.props.stroke,
            strokeWidth: this.props.strokeWidth,
            id: this.props.id
        })
        let text_content = this.props.text_content

        if(text_content === undefined || text_content === null) {
            text_content = []
        }

        text_content = text_content.length + ''
        
        /** add text element to the rectangle */ 
        var text = new fabric.Text(text_content.toUpperCase(), {
            fontSize: this.props.fontSize,
            fontFamily: 'Helvetica',
            fill: this.props.stroke,
            stroke: 'black',
            strokeWidth: this.props.strokeWidth/10,
            top: this.props.top + (this.props.height/2 - (this.props.fontSize/3)),
            left: this.props.left + (this.props.width/2 - (this.props.fontSize/3) - 15),
        });
          
        /** add shape and corresponding text to group element */  
        var group = new fabric.Group([ rect, text ], {
           
        });
          
        /** add group to canvas */
        this.props.canvas.add(group)
    }

    render() {
        return null
    }
}

/** must-have props for rectangle */
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

/** default props for rectangle */
Rectangle.defaultProps = {
    id: undefined,
    top: 0,
    left: 0,
    width: 50,
    height: 50,

    stroke: '#cd6133',
    strokeWidth: 5,
    fontSize: 10,
    fill:'transparent',
    text_content: []
};



export default Rectangle

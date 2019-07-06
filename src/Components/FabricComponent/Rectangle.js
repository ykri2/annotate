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
        this.props.canvas.add(rect)
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

};

Rectangle.defaultProps = {
    id: undefined,
    top: 0,
    left: 0,
    width: 50,
    height: 50,

    stroke: 'black',
    strokeWidth: 2,
    fill:'transparent'
};



export default Rectangle

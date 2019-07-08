import React from 'react'
import PropTypes from 'prop-types'

import { fabric } from 'fabric';


/**
 * React+Fabric component
 * Creates Circle shapes
 **/
class Circle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            
    
        }
    }

    componentDidMount() {
        const circle = new fabric.Circle(this.props)
        this.props.canvas.add(circle)
    }

    render() {
        return null
    }
}

Circle.propTypes = {
    canvas: PropTypes.object,
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    radius: PropTypes.number,

    fill: PropTypes.string.isRequired,
    stroke: PropTypes.string.isRequired,
    strokeWidth: PropTypes.number.isRequired,

    id: PropTypes.string.isRequired

};

Circle.defaultProps = {
    id: undefined,
    top: 0,
    left: 0,

    stroke: 'black',
    strokeWidth: 2,
    fill:'transparent'
};



export default Circle

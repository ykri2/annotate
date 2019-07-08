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
        const ellipse = new fabric.Ellipse(this.props)
        this.props.canvas.add(ellipse)
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

    id: PropTypes.string.isRequired
};

Ellipse.defaultProps = {
    id: undefined,
    top: 0,
    left: 0,
    rx: 100,
    ry: 70,
    originX: 'left',
    originY: 'top',
    stroke: 'black',
    strokeWidth: 2,
    fill:'transparent'
};



export default Ellipse

import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ExportComponent from './ExportComponent';



/** 
 * Upload Wrapper component 
 * 
 **/

class EWrapperComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {

        const files = this.props.files;

        return (
            <div className='ewrapper_comp'>
                <p className="ewrapper_comp_title" > EXPORT TO JSON OR CSV </p>

                             
                <ExportComponent />
             
            </div>
        )
    }
}

/** wrap global state to local component **/
function mapStateToProps(state, props) {
    return {
     
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EWrapperComponent);
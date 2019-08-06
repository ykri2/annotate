import React from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import OverviewComponent from './OverviewComponent';



/** 
 * Overview Wrapper component 
 * 
 **/

class OWrapperComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {

        const properties = this.props;

        return (
            <div className='owrapper_comp'>
                <p className="owrapper_comp_title" > DATA OVERVIEW  </p>
                <OverviewComponent properties={properties} />
            </div>
        )
    }
}

/** wrap global state to local component **/
function mapStateToProps(state, props) {
    return {
        annotations: state.annotations.annotations,
        files: state.files.files,
        currentFile: state.currentFile.currentFile,
        concepts: state.concepts.concepts,
        concept_types: state.concept_types.concept_types
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(OWrapperComponent);
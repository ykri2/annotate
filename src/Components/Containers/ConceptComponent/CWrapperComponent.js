import React from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import ConceptComponent from './ConceptComponent';
import TypeConceptComponent from './TypeConceptComponent';



/** 
 * Concept Wrapper component 
 * 
 **/

class CWrapperComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {

        const concepts = this.props.concepts;
        const concept_types = this.props.concept_types;

        return (
            <div className='uwrapper_comp'>
               <div className="uwrapper_comp_infobox">
                   
                   <p className="uwrapper_comp_title" >UPLOAD CONCEPTS (JSON ONLY)</p>

                   <div className="uwrapper_comp_section_one" >               
                       <ConceptComponent />
                       <TypeConceptComponent />
                   </div>

                   <div className="uwrapper_comp_section_two" >
                       <p className="uwrapper_paragraph_header"> Total amount of loaded concepts: { concepts !== undefined ? concepts.length : null} </p>
                       <p className="uwrapper_paragraph_header"> Total amount of loaded concept types: { concept_types !== undefined ? concept_types.length : null} </p>
                   </div>
               </div>
            </div>
        )
    }
}

/** map global state to component props **/
function mapStateToProps(state, props) {
    return {
        concepts: state.concepts.concepts,
        concept_types: state.concept_types.concept_types,
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CWrapperComponent);
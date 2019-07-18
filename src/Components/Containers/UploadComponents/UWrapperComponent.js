import React from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

import UploadComponent from './UploadComponent';
import ShowcaseFilesComponent from './ShowcaseFilesComponent'


/** 
 * Upload Wrapper component 
 * 
 **/

class UWrapperComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {

        const files = this.props.files;

        return (
            <div className='uwrapper_comp'>
               <div className="uwrapper_comp_infobox">
                   
                   <p className="uwrapper_comp_title" >IMAGE UPLOAD</p>

                   <div className="uwrapper_comp_section_one" >               
                       <UploadComponent />
                   </div>

                   <div className="uwrapper_comp_section_two" >
                       <p className="uwrapper_paragraph_header"> { files !== undefined ? files.length : null} </p>
                       { 
                        files.length > 0 ? 
                        <ShowcaseFilesComponent files={files} />
                        :
                        <p className="uwrapper_paragraph_header"> NO FILES UPLOADED </p>
                       }
                   </div>
               </div>
            </div>
        )
    }
}

/** wrap global annotations to local component **/
function mapStateToProps(state, props) {
    return {
        files: state.files.files
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(UWrapperComponent);
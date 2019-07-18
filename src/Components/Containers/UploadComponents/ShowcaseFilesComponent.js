import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';



/** 
 * Showcase files component
 * 
 **/

class ShowcaseFilesComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {

        const files = this.props.files;

        return (
            <div className='showcase_files_comp'>
                { files !== undefined && files.length > 0 ?
                files.map((file) => {
                    return (
                    <div className="image_card" >
                        <img src={`${file.local_url}`} />
                    </div>
                )})
                :
                null 
                }
            </div>
        )
    }
}

/** wrap global annotations to local component **/
function mapStateToProps(state, props) {
    return {
       
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseFilesComponent);
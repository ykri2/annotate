import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';



/** 
 * Showcase files component
 * display loaded images
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

/** unused **/
function mapStateToProps(state, props) {
    return {
        
    };
}

/** unused **/
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowcaseFilesComponent);
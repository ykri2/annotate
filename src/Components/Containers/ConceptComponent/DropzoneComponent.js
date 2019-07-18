import React from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';

/* eslint import/no-webpack-loader-syntax: off */
import GridLoader from '-!react-svg-loader!../../resources/grid.svg';
import UploadSVG from '-!react-svg-loader!../../resources/upload.svg';

/** 
 * Dropzone component
 * 
 **/

class DropzoneComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hightlight: false }
        this.fileInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);

        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);




    }

    onDragOver(e) {
        e.preventDefault();
      
        if (this.props.disabled) {
            return;
        }
      
        this.setState({ hightlight: true });
      }
    
    onDragLeave() {
        this.setState({ hightlight: false });
    }

    onDrop(e) {
        e.preventDefault();
      
        if (this.props.disabled) {
            return; 
        }

        let files = e.dataTransfer.files;


        if (this.props.onFilesAdded) {

            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        this.setState({ hightlight: false });
    }

    render() {
        return (
            <div 
                className={`dropzone ${this.state.hightlight ?
                    "highlight" : "" }`} 
                style={{
                    cursor: this.props.disabled ? "default" : "pointer"
                }}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
            >

                { this.props.fetching_files !== true ?
                <p className="icon_wrapper"><UploadSVG width={75} height={75}
                      
                /></p> :
                <p className="icon_wrapper"><GridLoader 
                        fill={'#182C61'} 
                /></p>
                }

                <input
                    ref={this.fileInputRef}
                    className="file_input"
                    type="file"
                    multiple
                    onChange={this.onFilesAdded} 
                />
                <p className="dropzone_p" >DRAG FILES</p>
            </div>
        )
    }

    openFileDialog() {
        if(this.props.disabled) {
            return;
        }
        this.fileInputRef.current.click()
    }

    onFilesAdded(e) {
        if(this.props.disabled) { 
            return; 
        }
        const files = e.target.files;
        if(this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    fileListToArray(list) {
        const array = []
        for(let i = 0; i < list.length; i++) {
            array.push(list.item(i))
        }
        return array;
    }

}

/** wrap global annotations to local component **/
function mapStateToProps(state, props) {
    return {
        fetching_files: state.files.fetching,
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DropzoneComponent);
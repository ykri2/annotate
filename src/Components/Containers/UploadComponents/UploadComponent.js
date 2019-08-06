import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import DropzoneComponent from './DropzoneComponent';

import { sendFilesToStore } from '../../../Actions/sendFilesToStore';


/** 
 * Upload Wrapper component 
 * 
 **/

class UploadComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          files: [],
          uploading: false,
          uploadProgess: {},
          successfullUploaded: false,

          wrong_file_type: false
        }

        this.checkUpload = this.checkUpload.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);

        this.renderActions = this.renderActions.bind(this);

    }

    /** on change listener for image files */
    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }))
    }

    render() {
        return (
            <div className='upload_card'>
              
              <div className="upload">
                <span className="title">UPLOAD FILES</span>
                <div className="upload_content">
                    <div className="dropzone_wrapper">
                        <DropzoneComponent 
                            onFilesAdded={this.onFilesAdded}
                            disabled={this.state.uploading || this.state.successfullUploaded}
                        />
                    </div>
                    <div className="files">
                        { this.state.files.length < 1 ? <p className="action_no_files">NO FILES</p> :
                            this.state.files.map(file => {
                                return (
                                    <div key={file.name} className="row" >
                                        <span className="filename">{file.name} </span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="actions" >
                    {this.renderActions()}
                </div>
              </div>
            

            </div>
        )
    }


    /** renders upload btn when no files had been loaded and renders remove btn if not */
    renderActions() {
        if(this.state.successfullUploaded) {
            return (
                <button className="upload_btn"
                    onClick={() => {
                        this.setState({ files: [], successfullUploaded: false })
                    }}
                ><p className="upload_btn_p">REMOVE FILES</p></button>
            )
        } else {
            return (
                <button className="upload_btn" id={ this.state.wrong_file_type ? "btn_error_alert" : null } 
                    disabled={ this.state.files.length < 0 || this.state.uploading } 
                    onClick={ !this.state.wrong_file_type ? this.uploadFiles.bind(this) : () => {
                        this.setState({ files: [], successfullUploaded: false, wrong_file_type: false })
                    } }
                ><p className="upload_btn_p" > { this.state.wrong_file_type ? "WRONG FILE TYPE - REMOVE" : "UPLOAD FILES"  }</p></button>
            )
        }
    }


    /** function gets unique id, used to compate image and annotation object */
    getUniqueId() {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); 
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    /** function creates image file objects 
     * - unique id and object URL for temporary local storage */
    createFileObject(files, callback) {
        let counter = 0;
        const nfile = files.map(file => {
            const obj = {
                index: counter,
                filename: file.name,
                local_id: this.getUniqueId(),
                local_url: URL.createObjectURL(file),
            }
            counter++;
            return obj 
        })
        return callback(nfile)
        
    }

    /** checks if file type is image */
    checkUpload() {
        const files = this.state.files;
        if(files !== undefined && files.length > 0) {
            let type = files[0].type.split('/')
            if(type[0] === "image") {
                return true; 
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**  upload function - get files and send to redux store */
    uploadFiles() {
        this.setState({ uploadProgress: {}, uploaing: true })
        const files = this.state.files;
        let shouldItProgress = this.checkUpload()
        if(files.length > 0 && shouldItProgress) {
            this.createFileObject(files, (f) => {
                this.props.sendFilesToStore(f)
                this.setState({ successfullUploaded: true, uploading: false, wrong_file_type: false })
            })
        } else {
            this.setState({
                wrong_file_type: true
            })
        }


    }

}


/** wrap global state to local component **/
function mapStateToProps(state, props) {
    return {
        fetching_files: state.files.fetching,
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
    sendFilesToStore: bindActionCreators(sendFilesToStore, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadComponent);
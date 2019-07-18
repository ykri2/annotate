import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import ProgressComponent from './ProgressComponent';
import PropTypes from 'prop-types';

import DropzoneComponent from './DropzoneComponent';

import { sendFilesToStore } from '../../../Actions/sendFilesToStore';

/* eslint import/no-webpack-loader-syntax: off */
import GridLoader from '-!react-svg-loader!../../resources/grid.svg';


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
        }
        
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);

        this.renderActions = this.renderActions.bind(this);

    }

    renderProgress(file) {
        const uploadProgress = this.state.uploadProgess[file.name];
        if(this.state.uploading || this.state.successfullUploaded) {
            return (
                <div className="progress_wrapper">
                    <ProgressComponent progress={ uploadProgress ? uploadProgess.percentage : 0 } />
                    <GridLoader 
                        className="check_icon"
                        alt="done"
                        style={{
                            opacity: uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                        }}
                    />
                </div>
            )
        }
    }

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
                <button className="upload_btn"
                    disabled={this.state.files.length < 0 || this.state.uploading} 
                    onClick={this.uploadFiles.bind(this)}
                ><p className="upload_btn_p">UPLOAD FILES</p></button>
            )
        }
    }

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


    uploadFiles() {
        this.setState({ uploadProgress: {}, uploaing: true })
        const files = this.state.files;
        this.createFileObject(files, (f) => {
            this.props.sendFilesToStore(f)
            this.setState({ successfullUploaded: true, uploading: false })
        })


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
    sendFilesToStore: bindActionCreators(sendFilesToStore, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadComponent);
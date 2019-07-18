import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';


import { addGlobalConcepts } from '../../../Actions/addGlobalConcepts';

import DropzoneComponent from '../UploadComponents/DropzoneComponent';

/* eslint import/no-webpack-loader-syntax: off */
import GridLoader from '-!react-svg-loader!../../resources/grid.svg';


/** 
 * Concept Wrapper component 
 * 
 **/

class ConceptComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          files: [],
          uploading: false,
          uploadProgess: {},
          successfullUploaded: false,

          LoadedJsonFile: undefined,
        }

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);

        this.renderActions = this.renderActions.bind(this);

    }

    static readUploadAsText = (file) => {

        const fileReader = new FileReader()

        return new Promise((resolve, reject) => {
            fileReader.onError = () => {
                fileReader.abort()
                reject(new DOMException("Probelm parsing input file."))
            }

            fileReader.onload = (e) => {
                resolve(JSON.parse(fileReader.result));
            }
            fileReader.readAsText(file)
        })

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
                <span className="title">UPLOAD CONCEPT FILE</span>
                <div className="upload_content">
                    <div className="dropzone_wrapper">
                        <DropzoneComponent 
                            onFilesAdded={this.onFilesAdded}
                            disabled={this.state.uploading || this.state.successfullUploaded}
                        />
                    </div>
                    <div className="files">
                        { this.state.files.length < 1 ? <p className="action_no_files">NO FILE - REQ. FORMAT IS {"{"} concepts = ["People", "Car", "Food", ..] {"}"}</p> :
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
                ><p className="upload_btn_p">REMOVE CONCEPTS</p></button>
            )
        } else {
            return (
                <button className="upload_btn"
                    disabled={this.state.files.length < 0 || this.state.uploading} 
                    onClick={this.uploadFiles.bind(this)}
                ><p className="upload_btn_p">UPLOAD CONCEPTS</p></button>
            )
        }
    }



    async createFileObject (files, callback) {
        let textFile = files[0]

        try {
            const fileContent = await ConceptComponent.readUploadAsText(textFile)
            return callback(fileContent.concepts)
        } catch (e) {
            
            console.log(e)
            this.setState({ successfullUploaded: false, uploading: false })
        }
    }



    uploadFiles() {
        this.setState({ uploadProgress: {}, uploaing: true })
        const files = this.state.files;
        this.createFileObject(files, (f) => {
    
            this.props.addGlobalConcepts(f)
            this.setState({ successfullUploaded: true, uploading: false })
        })


    }

}


/** wrap global annotations to local component **/
function mapStateToProps(state, props) {
    return {
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({
    addGlobalConcepts: bindActionCreators(addGlobalConcepts, dispatch),
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ConceptComponent);
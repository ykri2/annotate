import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { addGlobalConcepts } from '../../../Actions/addGlobalConcepts';
import DropzoneComponent from '../UploadComponents/DropzoneComponent';



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
        
          wrong_file_type: false
        }

        this.checkUploadJSON = this.checkUploadJSON.bind(this);

        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);

        this.renderActions = this.renderActions.bind(this);

    }

    /** read text files and return content in json */
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


    /** on change function for adding files to component state */
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

    /** display buttons, 
     * - if files have not been uploaded it shows upload button 
     * - if sucessfull upload show remove button 
     */
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
                <button className="upload_btn" id={ this.state.wrong_file_type ? "btn_error_alert" : null }
                    disabled={this.state.files.length < 0 || this.state.uploading} 
                    onClick={ !this.state.wrong_file_type ? this.uploadFiles.bind(this) : () => {
                        this.setState({ files: [], successfullUploaded: false, wrong_file_type: false })
                    }}
                ><p className="upload_btn_p"  > { this.state.wrong_file_type ? "WRONG FILE TYPE - REMOVE" : "UPLOAD FILES"  }</p></button>
            )
        }
    }


     /** returns file object
     * - takes file and a callback function to run after reading file
     */
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

    /** checks if loaded file is type json */
    checkUploadJSON() {
        const files = this.state.files;
        if(files !== undefined && files.length > 0) {
            let type = files[0].type.split('/')

            if(type[1] === "json") {
                return true; 
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    


    /** function attached to upload btn, start async function to read file */
    uploadFiles() {
        this.setState({ uploadProgress: {}, uploaing: true })
        const files = this.state.files;

        let shouldItProgress = this.checkUploadJSON()
        
        if(files.length > 0 && shouldItProgress) {
            this.createFileObject(files, (f) => {
                this.props.addGlobalConcepts(f)
                this.setState({ successfullUploaded: true, uploading: false, wrong_file_type: false })
            })
        } else {
            this.setState({
                wrong_file_type: true
            })
        }

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
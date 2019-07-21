import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';




/** 
 * Export component 
 * 
 **/

class ExportComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          files: [],
          uploading: false,
          uploadProgess: {},
          successfullUploaded: false,
        }
        
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.exportCsvFile = this.exportCsvFile.bind(this);
        this.exportJsonFile = this.exportJsonFile.bind(this);

        this.exportImageCsvFile = this.exportImageCsvFile.bind(this);
        this.exportImageJsonFile = this.exportImageJsonFile.bind(this);

    }


    onFilesAdded(files) {
        this.setState(prevState => ({
            files: prevState.files.concat(files)
        }))
    }

    render() {

        const images = this.props.global_files;
        const annot = this.props.global_annotations;
   
        return (
            <div className='export'>
                <div className="export_card">
                    <div className="export_inner_wrapper">
                    <span className="title">EXPORT CSV</span>
                        <div className="export_content">
                            <div className="export_btn_wrapper">
                                <button disabled={ annot !== undefined && annot.length < 0 ? true : false } className="export_btn"  id="export_btn_csv" onClick={() => {
                                    this.exportCsvFile();
                                }} >
                                    <p className="export_btn_p" >CSV</p>
                                </button>
                            </div>
                            <div className="files">
                                <p className="action_no_files"> { annot === undefined || annot.length < 1 ? "Annotation list is empty" : "Click button to download CSV file." } </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="export_card">
                    <div className="export_inner_wrapper">
                        <span className="title">EXPORT JSON</span>
                        <div className="export_content">
                            <div className="export_btn_wrapper">
                                <button disabled={ annot !== undefined && annot.length < 0 ? true : false } className="export_btn" id="export_btn_json" onClick={() => {
                                    this.exportJsonFile();
                                }} >
                                    <p className="export_btn_p" >JSON</p>
                                </button>
                            </div>
                            <div className="files">
                                <p className="action_no_files"> { annot === undefined || annot.length < 1 ? "Annotation list is empty" : "Click button to download JSON file." } </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="export_card">
                    <div className="export_inner_wrapper">
                        <span className="title">EXPORT IMAGE CSV</span>
                        <div className="export_content">
                            <div className="export_btn_wrapper">
                                <button disabled={ iamges !== undefined && images.length < 0 ? true : false } className="export_btn" id="export_btn_csv" onClick={() => {
                                    this.exportImageCsvFile();
                                }} >
                                    <p className="export_btn_p" >CSV</p>
                                </button>
                            </div>
                            <div className="files">
                                <p className="action_no_files"> { images === undefined || images.length < 1 ?  "First import, then export" : "Click the button to download CSV file with image anme and corresponding annotation id." } </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="export_card">
                    <div className="export_inner_wrapper">
                        <span className="title">EXPORT IMAGE JSON</span>
                        <div className="export_content">
                            <div className="export_btn_wrapper">
                                <button disabled={ images !== undefined && images.length < 0 ? true : false } className="export_btn"  id="export_btn_json" onClick={() => {
                                    this.exportImageJsonFile();
                                }} >
                                    <p className="export_btn_p" >JSON</p>
                                </button>
                            </div>
                            <div className="files">
                                <p className="action_no_files"> { images === undefined || images.length < 1 ? "First import, then export" : "Click the button to download JSON file with image name and corresponding annotation id." } </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    exportCsvFile() {

        if(this.props.global_annotations !== undefined) {

            let annotations = this.props.global_annotations;

            let filename="annotations.csv"

            const create2Darr = (arr) => {
                var mp = new Map();
                
                function setValue(a, path, val) {
                    if (Object(val) !== val) { // primitive value
                        var pathStr = path.join('.');
                        var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
                        a[i] = val;
                    } else {
                        for (var key in val) {
                            setValue(a, key == '0' ? path : path.concat(key), val[key]);
                        }
                    }
                    return a;
                }
                
                var result = arr.map( obj => setValue([], [], obj) );
                return [[...mp.keys()], ...result];
                
            }

            const toCsv = (arr) => {
                return arr.map( row => 
                    row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(',')
                ).join('\n');
            }
            
            let csvfile = '';
    
            csvfile += toCsv(create2Darr(annotations))
          
            let blob = new Blob([csvfile], { type: 'text/csv/;charset=utf-8;'});


            if(navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if(link.download !== undefined) {
                    let url = URL.createObjectURL(blob)
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link)
                    link.click();
                    document.body.removeChild(link)
                }
            }
        }
    }


    exportJsonFile() {

        if(this.props.global_annotations !== undefined) {

            let annotations = this.props.global_annotations;
        
            let filename="annotations.json"

            const processJsonContent = (content) => {
                return JSON.stringify(content, null, "\t")
            }
            
            let jsonfile = processJsonContent(annotations)
            

            let blob = new Blob([jsonfile], { type: 'text/json/;charset=utf-8;'});


            if(navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if(link.download !== undefined) {
                    let url = URL.createObjectURL(blob)
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link)
                    link.click();
                    document.body.removeChild(link)
                }
            }
        }   
    }

    exportImageCsvFile() {


        if(this.props.global_files !== undefined) {

            let images = this.props.global_files;

            let filename="images.csv"

            const create2Darr = (arr) => {
                var mp = new Map();
                
                function setValue(a, path, val) {
                    if (Object(val) !== val) { // primitive value
                        var pathStr = path.join('.');
                        var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
                        a[i] = val;
                    } else {
                        for (var key in val) {
                            setValue(a, key == '0' ? path : path.concat(key), val[key]);
                        }
                    }
                    return a;
                }
                
                var result = arr.map( obj => setValue([], [], obj) );
                return [[...mp.keys()], ...result];
                
            }

            const toCsv = (arr) => {
                return arr.map( row => 
                    row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(',')
                ).join('\n');
            }
            
            let csvfile = '';
    
            csvfile += toCsv(create2Darr(images))
            console.log(csvfile)
            let blob = new Blob([csvfile], { type: 'text/csv/;charset=utf-8;'});


            if(navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if(link.download !== undefined) {
                    let url = URL.createObjectURL(blob)
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link)
                    link.click();
                    document.body.removeChild(link)
                }
            }
        }
    }

    exportImageJsonFile() {
        console.log("correct function?")
        if(this.props.global_files !== undefined) {
            let images = this.props.global_files;
            console.log(images)
            let filename="images.json"

            const processJsonContent = (content) => {
                return JSON.stringify(content, null, "\t")
            }

            
            let jsonfile = processJsonContent(images)
                

            let blob = new Blob([jsonfile], { type: 'text/json/;charset=utf-8;'});


            if(navigator.msSaveBlob) {
                navigator.msSaveBlob(blob, filename);
            } else {
                var link = document.createElement("a");
                if(link.download !== undefined) {
                    let url = URL.createObjectURL(blob)
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link)
                    link.click();
                    document.body.removeChild(link)
                }
            }
        }
    }
}


/** wrap global annotations to local component **/
function mapStateToProps(state, props) {
    return {
        global_annotations: state.annotations.annotations,
        global_files: state.files.files
        
    };
}

/** map functions to props **/
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ExportComponent);
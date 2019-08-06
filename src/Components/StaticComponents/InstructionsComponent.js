import React from 'react';

/** 
 * Instructions component 
 * - display paragraphs of instuctions
 **/

class InstructionsComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {
        return (
            <div className='instructions_comp'>
               <div className="instructions_comp_infobox">
                   
                   <p className="instructions_comp_title" >INSTRUCTIONS</p>
                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> UPLOAD FILES </p>
                       <p className="instructions_comp_paragraph">       
                        To begin you have to upload images, to do so go to the upload page found in the horizontal dropdown menu. Drag and drop or click and select local files on your computer. 
                        When the files are listed to the right of the dropzone click the upload button and wait, when the upload is complete the images will be listed beneath.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> UPLOAD CONCEPTS </p>
                       <p className="instructions_comp_paragraph">       
                        Before you can start annotating the images that were uploaded, navigate to the page for uploading concepts by using the horizontal dropdown menu. 
                        To upload concepts drag and drop or click and select a JSON file (must be JSON, required format is illustrated on the upload concept page). 
                        Uploading concepts is required to annotated images, if no concepts are present the input for seleting what is in the image will not be visible. 
                        The concept types are not required, the input is not visible if there are no available concept types. The amount of uploaded concepts and types is displayed beneath.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> IMAGE ANNOTATION </p>
                       <p className="instructions_comp_paragraph">       
                        After images and concepts have been uploaded go back to the frontpage by selecting HOME in the main navigation menu at the top of the page.
                        At the top are two buttons for navigating back and forth between images. Beneath those are three more buttons for selecting different shapes to frame objects in an image, the options are RECTANGLE, ELLIPSE, and POLYLINE.
                        Beneath the displayed image are some more buttons, alternatives for zooming on the canvas (zoom by button click and zoom by mouse scroll can be toggled), as well a button for resetting the canvas to its original size or customizing zoom rate.
                        Other alternatives present is the option to remove objects from canvas / stored annotations, and a option for previewing placement and size data on selected shapes. <br/> <br/>
                        
                        Note: to drag the image around on the canvas by using the mouse, hold alt-key and drag.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> DESCRIBING IMAGE AND SHAPE </p>
                       <p className="instructions_comp_paragraph">       
                        -> By dobble clicking on the image you can open a popup for describing the image, the popup displays filename, an input for giving a short description, 
                        and options for selecting concepts associated with the image as a whole. Click the save button for storing the recorded information. <br/> <br/>

                        -> By dobble clicking on a drawn shape a popup will be displayed with the options for selecting concepts relating to what is in the framed area, as well as other properties. 
                        To save an annotated/described area click the button for saving the recorded information.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> OVERVIEW </p>
                       <p className="instructions_comp_paragraph">       
                        To view a summary of information currently in the application go to the overview page by selecting it in the horizontal dropdown menu. The overview page display six different cards. <br/><br/>
                        1. Amount of files with annotations and total number of files. <br/><br/>
                        2. The index of the image currently displayed, and the option to move to another image by providing an index. <br/><br/>
                        3. Total number of concepts and total number of concept types currently uploaded. <br/><br/>
                        4. Total number of most frequent concepts used and those concepts. <br/><br/>
                        5. The number of images with most described objects/areas and the index of those images. <br/><br/>
                        6. Total number of most frequent concept types used and those types. <br/><br/>
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> EXPORT JSON OR CSV FILE </p>
                       <p className="instructions_comp_paragraph">       
                        To export data on annotated images navigate to the export page by using the horizontal dropdown menu. The export page allows for exporting the list of annotations (each image has one object in this list), 
                        with a unique local id used to find annotation object and corresponding image. <br/><br/>

                        Export is available in CSV and JSON format.<br/><br/>

                        Each annotation object has an local id and two seperate sections, file_properties and areas. The file properties contain the filename, concepts relating to the image as a whole, and a short description. 
                        While areas is a list of objects, each object corresponding to a annotated object in an image and consists of shape_attributes describing a location on the image and shape_properties describing what is in the image location. <br/><br/>

                        The page also allows for exporting image data, this a list similar to the annotations. Each object in the list belongs to an image, and contains the local id used to find the corresponding annotation object and the filename. 
                        Filename is also present in the annotation object under file_properties, and can also be used as an alternative for comparing and finding images and their corresponding annotation object.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_comp_paragraph_two">
                        Enjoy, it's been fun.
                       </p>
                   </div>
               </div>
            </div>
        )
    }
}

export default InstructionsComponent;
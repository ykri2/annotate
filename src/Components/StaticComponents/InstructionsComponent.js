import React from 'react';

/** 
 * Instructions component 
 * 
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
                       <p className="instructions_paragraph_header"> ANNOTATION SHAPES </p>
                       <p className="instructions_comp_paragraph">       
                        Penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> IMAGE UPLOAD/DOWNLOAD </p>
                       <p className="instructions_comp_paragraph">       
                        Penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> OUTPUT FORMAT </p>
                       <p className="instructions_comp_paragraph">       
                        Penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_paragraph_header"> KEYBOARD CONTROLS </p>
                       <p className="instructions_comp_paragraph">       
                        Penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                       </p>
                   </div>

                   <div className="instructions_comp_section" >
                       <p className="instructions_comp_paragraph_two">
                        Elit at imperdiet dui accumsan sit amet. Elementum nibh tellus molestie nunc non blandit massa enim. Mi sit amet mauris commodo quis imperdiet massa tincidunt.
                       </p>
                   </div>
               </div>
            </div>
        )
    }
}

export default InstructionsComponent;
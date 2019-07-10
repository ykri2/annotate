import React from 'react';

/** 
 * Upload Wrapper component 
 * 
 **/

class UWrapperComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {
        return (
            <div className='uwrapper_comp'>
               <div className="uwrapper_comp_infobox">
                   
                   <p className="uwrapper_comp_title" >IMAGE UPLOAD</p>
                   <div className="uwrapper_comp_section" >
                       <p className="uwrapper_paragraph_header"> SELECT IMAGE </p>
                       <p className="uwrapper_comp_paragraph">       
                        Penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                       </p>
                   </div>

                   <div className="uwrapper_comp_section" >
                       <p className="uwrapper_paragraph_header"> UPLOADED IMAGES </p>
                       <p className="uwrapper_comp_paragraph">       
                        Penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                       </p>
                   </div>
               </div>
            </div>
        )
    }
}

export default UWrapperComponent;
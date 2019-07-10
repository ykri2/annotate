import React from 'react';

/** 
 * About component
 * 
 **/

class AboutComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {
        return (
            <div className='about_comp'>
               <div className="about_comp_infobox">
                   
                    <p className="about_comp_title" >ABOUT</p>
                    <div className="about_comp_section" >
                        <p className="about_comp_paragraph_one">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Leo integer malesuada nunc vel. Sed arcu non odio euismod lacinia at quis risus sed. Nam aliquam sem et tortor consequat id. Interdum velit laoreet id donec ultrices tincidunt arcu non. Tempor commodo ullamcorper a lacus vestibulum sed arcu. Ut placerat orci nulla pellentesque dignissim. Enim praesent elementum facilisis leo vel fringilla est ullamcorper. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Sagittis eu volutpat odio facilisis mauris. Viverra justo nec ultrices dui sapien eget. Tellus mauris a diam maecenas sed enim. Varius vel pharetra vel turpis nunc. Eget gravida cum sociis natoque penatibus et. Massa tempor nec feugiat nisl pretium fusce id velit. Nisl purus in mollis nunc sed id semper. Sociis natoque penatibus et magnis dis parturient montes nascetur.
                        </p><br/><p className="about_comp_paragraph_one">
Sed libero enim sed faucibus. Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Vivamus at augue eget arcu dictum varius duis at consectetur. Non diam phasellus vestibulum lorem sed risus ultricies tristique. Senectus et netus et malesuada. Aliquet nec ullamcorper sit amet. Diam sollicitudin tempor id eu nisl. Pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat. Hac habitasse platea dictumst quisque sagittis. Auctor elit sed vulputate mi. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Non odio euismod lacinia at quis risus sed vulputate odio. Vitae et leo duis ut diam quam nulla. Lectus quam id leo in. Aliquam malesuada bibendum arcu vitae elementum. Sociis natoque penatibus et magnis dis parturient montes nascetur. Sit amet consectetur adipiscing elit. Lectus mauris ultrices eros in cursus. Ornare suspendisse sed nisi lacus sed viverra tellus in.
                        </p>
                    </div>
                    <div className="about_comp_section" >
                        <p className="about_comp_paragraph_two">
Elit at imperdiet dui accumsan sit amet. Elementum nibh tellus molestie nunc non blandit massa enim. Mi sit amet mauris commodo quis imperdiet massa tincidunt.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutComponent;
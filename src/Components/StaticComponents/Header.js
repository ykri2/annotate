import React from 'react';

/** 
 * Header component 
 * 
 **/

class Header extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          
        }
        

    }

    render() {
        return (
            <div className='header_comp'>
               <div className="header_comp_infobox">
                    <p className="header_comp_title" >Annotate</p>
                </div>
            </div>
        )
    }
}

export default Header;
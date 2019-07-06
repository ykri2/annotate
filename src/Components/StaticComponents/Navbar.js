import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import {connect} from 'react-redux';

import PropTypes from 'prop-types';

/**
 * Main navbar component
 *  
 **/

class Navbar extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
         
       };
   }
 

   render() {



        return (
            <div className="navbar_comp">
                
        
                <div className="navbar_item" id="navbar_item_1" >
                    <RouterNavLink to="/"  id='navbartext' >
                        <p className="navitem_text" id="" >HOME</p>
                    </RouterNavLink>
                </div>  
               <div className="navbar_item" id="navbar_item_2" >
                    <RouterNavLink to="/"  id='navbartext' >
                        <p className="navitem_text" id="" >ABOUT</p>
                    </RouterNavLink>
               </div>
               <div className="navbar_item" id="navbar_item_3" >
                    <RouterNavLink to="/"  id='navbartext' >
                        <p className="navitem_text" id="" >INSTRUCTIONS</p>
                    </RouterNavLink>
               </div>
               <div className="navbar_item" id="navbar_item_4" >
                    <RouterNavLink to="/"  id='navbartext' >
                        <p className="navitem_text" id="" >UIB</p>
                    </RouterNavLink>
               </div>
           </div>
        )
    }

    logginOut() {
        this.props.history.push('/');
    }


}

Navbar.propTypes = {

}

/** unused **/
function mapStateToProps(state, props) {
    return {};
}

/** unused **/
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
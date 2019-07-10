import React, { Component } from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import { NavLink as RouterNavLink } from 'react-router-dom';

class OptionMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
        display: false,
        errors: {}

    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this);


  }

  /** toggle dropdown menu */
  showDropdownMenu(e) {
      e.preventDefault();
      this.setState({ display : !this.state.display })
  }


  render() {
    const errors = this.state.errors;
    const listitems = this.props.listitems
    let items = listitems.items;
    const listoflis = items.map((item, key) => {
        return(<li key={key}>
            <RouterNavLink to={item.destination}  id='navbartext' className={ key===1 ? "active" : null } >
                <p className="navitem_text" id="" >{item.item}</p>
            </RouterNavLink></li>
        )
    })

    return (
        <div className="optmenu_component">
            <div className="btn" onClick={this.showDropdownMenu} > {listitems.btn_type} </div>
            { this.state.display ? 
                <ul>                        
                    {
                        listoflis
                    }
                </ul>
            :
                null
            }

        </div>
        )
    }
}


/** must-have props for option-menu */
OptionMenu.propTypes = {

};

/** add must-have default props for option-menu */
OptionMenu.defaultProps = {

};


/** Map global state to component properties */
function mapStateToProps(state, props) {
    return {
    };
}

/** Map redux actions to component properties */
const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OptionMenu);

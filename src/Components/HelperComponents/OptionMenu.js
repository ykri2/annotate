import React, { Component } from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'


class OptionMenu extends Component {
  constructor(props){
    super(props);
    this.state = {
        display: false,
        errors: {}

    }

    this.showDropdownMenu = this.showDropdownMenu.bind(this);


  }

  showDropdownMenu(e) {
      e.preventDefault();
      this.setState({ display : !this.state.display })
  }


  render() {
    const errors = this.state.errors;
    const listitems = this.props.listitems
    let items = listitems.items;
    const listoflis = items.map((item, key) => {
        return(<li key={key}><a className={ key===1 ? "active" : null } >{item}</a></li>)

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



OptionMenu.propTypes = {

};

OptionMenu.defaultProps = {

};

function mapStateToProps(state, props) {
    return {


    };
}

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OptionMenu);

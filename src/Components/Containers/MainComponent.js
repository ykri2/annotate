import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
import WrapperComponent from './WrapperComponent';

/* eslint import/no-webpack-loader-syntax: off */
import GridLoader from '-!react-svg-loader!../resources/grid.svg';


/**
 * Main component
 * holds wrapper component for canvas area and loading svg
 **/

class MainComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoading: false,
        errors: {}

    }



  }



  render() {
    const errors = this.state.errors
    const isLoading = this.props.isLoading

    if(isLoading === true) {

      return (
        <div className="loader_wrapper">
              <GridLoader fill="#9ed1e7" />
        </div>
      )
    } else {

        return (
            <div className="main_component">
              <WrapperComponent />
            </div>
        );
      }
    }




}

/** add must-have props here */
MainComponent.propTypes = {

};

/** add default values for props here */
MainComponent.defaultProps = {

};

/** Unused **/
function mapStateToProps(state, props) {
    return {
      isLoading: state.annotations.fetching
    };
}

/** Unused **/
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);

import React, { Component } from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'


/** 
 * Textarea component 
 * used to display json annotations
 **/
class TextAreaComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
        errors: {}
    }

  }

  render() {
    const errors = this.state.errors;
    const config = this.props;

    return (
        <div className="textarea_component">
            
            <textarea 
                rows={config.rows}
                cols={config.cols}
                key={'ta1'}
                defaultValue={JSON.stringify(config.content)}
            ></textarea>

        </div>
        )
    }
}


/** must-have props for text-area */
TextAreaComponent.propTypes = {

};

/** must-have default prop values for text area  */
TextAreaComponent.defaultProps = {

};

/** unused */
function mapStateToProps(state, props) {
    return {};
}

/** unused */
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TextAreaComponent);

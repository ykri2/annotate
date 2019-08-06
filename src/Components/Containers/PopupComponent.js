import React, { Component } from 'react';
import PropTypes from 'prop-types'

import { turnToText } from '../resources/turnToText';

import TextInputComponent from '../HelperComponents/TextInputComponent';
import SelectInputComponent from '../HelperComponents/SelectInputComponent';
import AutoSuggestComponent from '../HelperComponents/AutoSuggestComponent';

/** 
 * Popup component 
 * shows when a shape is double clicked
 * used for annotating image content
 **/

class PopupComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        what: undefined,
        suggestions: [],

        type: undefined,
        type_suggestions: [],

        clear_view: undefined,
        well_illuminated: undefined,

        short_description: undefined,
        filename: undefined,


        errors: {}
      }

      this.onChangeSelect = this.onChangeSelect.bind(this)
      this.onChangeText = this.onChangeText.bind(this)
      this.saveAnnotation = this.saveAnnotation.bind(this)

      this.onChangeAs = this.onChangeAs.bind(this)
      this.onSelectAs = this.onSelectAs.bind(this)

      this.onChangeAs_type = this.onChangeAs_type.bind(this)
      this.onSelectAs_type = this.onSelectAs_type.bind(this)

    }
    
    /** on change autocomplete content(what) text field 
     * - record whats written and show suggestions */
    onChangeAs(e) {
      const value = e.target.value;
      let valArr = value.split(',')
      let suggestions = [];
      if(valArr.length > 0) {
          let val = valArr[valArr.length -1]
          const regex = new RegExp(`^${val}`, 'i');
          suggestions = this.props.concepts.sort().filter(v => regex.test(v));
      }

      this.setState({ suggestions: suggestions, what: valArr });
    }

    /** on select autocomplete content(what) text field
     * - add to component state and clear suggestion list
     */
    onSelectAs(value) {
      let what = this.state.what;
      what[what.length - 1] = value
      this.setState(() => ({
        what: what,
        suggestions: []
    }))
    }

    /** on change autocomplete type text field 
     * - record whats written and show suggestions */
    onChangeAs_type(e) {
      const value = e.target.value;
        let valArr = value.split(',')
        let suggestions = [];
        if(valArr.length > 0) {
            let val = valArr[valArr.length - 1]
            const regex = new RegExp(`^${val}`, 'i');
            suggestions = this.props.concept_types.sort().filter(v => regex.test(v));
        }

        
        this.setState({ type_suggestions: suggestions, type: valArr });
        

    }

    /** on select autocomplete type text field
     * - add to component state and clear suggestion list
     */
    onSelectAs_type(value) {
      let type = this.state.type;
      type[type.length -1 ] = value
      this.setState(() => ({
        type: type,
        type_suggestions: []
    }))
    }

    /** sets state with either annotation or file properties */
    componentWillMount() {
      
      if(Object.keys(this.props.current_area)[0].toLowerCase() === "shape_attribute") {

        this.setState((state, props) => ({
          what: props.current_area.shape_properties.what,
          type: props.current_area.shape_properties.type,
          clear_view: props.current_area.shape_properties.quality_remarks.clear_view === "true" && props.current_area.shape_properties.quality_remarks.clear_view !== undefined ? 'true' : 'false',
          well_illuminated: props.current_area.shape_properties.quality_remarks.well_illuminated === "true" && props.current_area.shape_properties.quality_remarks.well_illuminated !== undefined  ? 'true' : 'false' ,
        }))
      } else {
        this.setState((state, props) => ({
          what: props.current_area.what,
          type: props.current_area.type,
          filename: props.current_area.filename,
          short_description: props.current_area.short_description
        }))
      }
    }

    /** adds changes to state for select-type input */
    onChangeSelect(e) {
      this.setState({ 
        [e.target.name]: e.target.value
      })
    }

    /** adds changes to state for text-type input */
    onChangeText(e) {
      this.setState({ 
        [e.target.name]: e.target.value
      })
    }
    
    render() {
    
      const area = this.state;

      const concepts = this.props.concepts;
      const concept_types = this.props.concept_types;


      const errors = this.state.errors;
      const options = ['false', 'true'].map((val, key) => {
        return <option key={key} value={val} >{ val }</option>
      });

      return (
        <div className='popup_component'>
          <div className='popup_wrapper_inner'>
            <div className="popup_upper">
              <div className="popup_upper_wrapper">
                

                  { this.state.filename !== undefined ?
                    <div className="filename_row_wrapper">
                      
                      <p className="popup_filename_p"> Filename: {area.filename}</p>
                      
                      <TextInputComponent 
                        error={errors.type}
                        label="Short description : "
                        onChange={this.onChangeText}
                        value={area.short_description}
                        field="short_description"
                        type="text"      
                      />
                    </div>
                  : null }

                { concepts !== undefined && concepts !== null && concepts.length > 0 
                ?
                <div className="input_row_wrapper">

                  <AutoSuggestComponent
                    label={"What: "}
                    error={errors.as_one}
                    field={"what"}
                    value={ turnToText(this.state.what) }
                    onChange={this.onChangeAs}
                    onSelect={this.onSelectAs}
                    suggestions={this.state.suggestions}
                    type={"text"}
                    
                  />

                { concept_types !== undefined && concept_types !== null && concept_types.length > 0 
                ?
                <AutoSuggestComponent
                    label={"Type: "}
                    error={errors.as_two}
                    field={"type"}
                    value={ turnToText(this.state.type) }
                    onChange={this.onChangeAs_type}
                    onSelect={this.onSelectAs_type}
                    suggestions={this.state.type_suggestions}
                    type={"text"}
                    
                  /> : null
                }

                </div>  
                :
                <div className="input_row_wrapper">
                  <p className="no_concept_available_p"> Go to concept page and load JSON file. </p>
                </div>
              
                }

                { this.state.filename === undefined ?

                <div className="input_row_wrapper">
                  <SelectInputComponent
                    error={errors.clear_view}
                    label={"Object in clear view: "}
                    onChange={this.onChangeSelect}
                    value={area.clear_view }
                    field={"clear_view"}
                    options={options}                      
                  />

                  <SelectInputComponent
                    error={errors.well_illuminated}
                    label={"Object well illuminated: "}
                    onChange={this.onChangeSelect}
                    value={area.well_illuminated }
                    field={"well_illuminated"}
                    options={options}                      
                  />
                </div>
                :
                null }
              </div>

            </div>
            <div className="popup_bottom" >
              <button className="close_btn" onClick={this.props.closePopup}><p className="close_btn_p"> CLOSE </p></button>
              <button className="close_btn" onClick={this.saveAnnotation.bind(this)}><p className="close_btn_p"> SAVE ANNOTATION </p></button>
            </div>
          </div>
        </div>
      );
    }

    /** saves annotation - get information from state and calls addNewToGlobalAnnotations() */
    saveAnnotation(e) {
      e.preventDefault();
      const currentState = this.state
      if(currentState.filename !== undefined && currentState.filename !== null) {
      
        this.props.addNewToGlobalAnnotations({
          filename: currentState.filename,
          short_description: currentState.short_description,
          what: currentState.what,
          type: currentState.type
        })
      } else {
  
        this.props.addNewToGlobalAnnotations({
          what: currentState.what,
          type: currentState.type,
          clear_view: currentState.clear_view,
          well_illuminated: currentState.well_illuminated
        })
      }
      this.props.closePopup()
    }

  }

  /** must-have props for popup component */
  PopupComponent.propTypes = {
    current_area: PropTypes.object.isRequired,
    closePopup: PropTypes.func.isRequired,

  };
  
  /** default props for popup component */
  PopupComponent.defaultProps = {

  };

  export default PopupComponent;
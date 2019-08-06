import React, { Component } from "react";
import PropTypes from 'prop-types';

/**
 * 
 * Select input components (const)
 * used for rendering an input with options, takes options and on change function
 */

const SelectInputComponent = ({ field, value, label, error, onChange, options }) => (
    <div className="select_input_div" id='select_input_column'>
        <label className="select_input_label">{label}</label>
        { error && <span className="help_block">{error}</span> } 
        <select
            className="select_input"
            name={field}
            value={value} 
            onChange={onChange}
        >
            <option value="" disabled>Choose option</option>
            {options}
        </select>
    </div>
    )

/** must-have props for select-input */
SelectInputComponent.prototype = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
}

/** must-have default prop values for select-input */
SelectInputComponent.defaultProps = {
      
}

export default SelectInputComponent;
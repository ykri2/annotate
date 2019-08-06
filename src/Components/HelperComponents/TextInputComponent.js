import React from "react";
import PropTypes from 'prop-types'

/**
 * 
 * Text input component (const)
 * default type is text
 */

const TextInputComponent = ({ field, value, label, error, onChange, type, max_length, min_length }) => (
    <div className="text_input_div" id='input_id'>
        <label className="text_input_label">{label}</label>
        { error && <span className="help-block">{error}</span> } 
        <input
            onChange={onChange} 
            error={error}
            value={value}
            type={type}
            name={field}
            className="text_input"  
            max={ type !== 'number' ? null : max_length !== undefined ? max_length : 100 }
            min={ type !== 'number' ? null : min_length !== undefined ? min_length : 1 }
            />
    </div>
    )

/** must-have props in text-input */
TextInputComponent.prototype = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

/** default values for must-have props in text-input */   
TextInputComponent.defaultProps = {
        type: 'text'
}

export default TextInputComponent;
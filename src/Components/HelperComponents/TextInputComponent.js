import React from "react";
import PropTypes from 'prop-types'


const TextInputComponent = ({ field, value, label, error, onChange, type }) => (
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
            max={ type === 'number' ? 12 : null }
            min={ type === 'number' ? 2 : null }
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
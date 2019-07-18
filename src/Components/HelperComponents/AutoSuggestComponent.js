import React from "react";
import PropTypes from 'prop-types'

const showSuggestions = (suggestions, suggestionSelected) => {
    if(suggestions.length === 0) {
        return null;
    }
    return  (
        <ul className="as_ul">
            {suggestions.map((item, key) => <li className="as_li" key={key} onClick={() => suggestionSelected(item)} ><p className="li_p"> {item} </p></li>)}
        </ul>
    )
}

const AutoSuggestComponent = ({ label, error, field, value, onChange, onSelect, suggestions, type }) => (
    <div className="autosuggest_component">
        <label className="as_input_label">{label}</label>
        <input
            error={error}
            field={field}
            value={value}
            onChange={onChange} 
            type={type} 
            className="as_input" 
               
        />
        {showSuggestions(suggestions, onSelect)}

    </div>
    )

/** must-have props in text-input */
AutoSuggestComponent.prototype = {
    errors: PropTypes.string,
    value: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    suggestions: PropTypes.func,
    type: PropTypes.string.isRequired,
 
}

/** default values for must-have props in text-input */   
AutoSuggestComponent.defaultProps = {
        type: 'text'
}

export default AutoSuggestComponent;
import React from "react";
import PropTypes from 'prop-types'


/**
 * show suggestion 
 * - takes all suggestions and renders list of alterntives to input
 * - takes function for selecting an alternative in the list and attaches is to list elements 
 */
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

/** Autocomplete Component (const)  - used for autocomplete text inputs */
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

/** must-have props in autosuggest */
AutoSuggestComponent.prototype = {
    errors: PropTypes.string,
    value: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    suggestions: PropTypes.func,
    type: PropTypes.string.isRequired,
 
}

/** default values for must-have props in autosuggest */   
AutoSuggestComponent.defaultProps = {
        type: 'text'
}

export default AutoSuggestComponent;
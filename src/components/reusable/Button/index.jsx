//==============================================================================
import React from "react";
import _ from "lodash"
//==============================================================================
import { 
    Button,
} from "./style.js";
//==============================================================================
function _Button (props) {
    const { type, style, onClick, isLoading, text } = props    
    const { checkForMissingField, error, success, disabled } = props    
    const { onFocus, onBlur } = props    
    // type: success, info, danger, warning, dark, white, app__lightgray, none
    return (    
        <Button 
            onClick={(disabled)? null : onClick}
            onFocus={onFocus}
            onBlur={onBlur}
            type={type}
            style={style}
            isLoading={isLoading}
            error={(checkForMissingField && _.isEmpty(text)) || error}
            success={success}
            disabled={disabled}
        >
            {text}
        </Button>                          
    )
}

export default _Button;
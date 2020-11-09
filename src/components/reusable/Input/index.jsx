//==============================================================================
import _ from "lodash";
import React from "react";
import { ThemeProvider } from "styled-components";
//==============================================================================
import {
    InputContainer,
    InputLabel,
    Input,
} from "./style.js";
//==============================================================================

function _Input (props) {

    const { label="", disabled, placeholder=(props.label || ""), style } = props;
    const { type="text", required, value, onChange } = props;
    const { checkForMissingField=false, error, success, isLoading } = props;

    const theme = { 
        hasValue: !_.isEmpty(value),
        isLoading,
    };

    return (         
        <ThemeProvider theme={theme}>
            <InputContainer 
                style={style} 
                error={((checkForMissingField && _.isEmpty(value)) || error)}
                success={success}
            >
                <InputLabel> 
                    <div> {label} </div>                
                </InputLabel>

                <Input
                    type={type} 
                    onChange={onChange}
                    disabled={disabled || isLoading}
                    placeholder={placeholder}
                    value={value}
                    required={required}
                    style={style}
                />


            </InputContainer>
        </ThemeProvider>
    )
}

export default _Input;
//==============================================================================
import React, { useContext } from "react";
//==============================================================================
import Button from "../Button/index.jsx";

import RecipeContext from "../../../context/recipe-context";

import {
    ModalButtonsContainer,
} from "./style.js";
//==============================================================================

function _ModalButtonsContainer (props) {

  const context = useContext(RecipeContext);

  const { onYesFunction=()=>{}, onNoFunction=()=>{} } = props;
  const { onYesLabel="Accept", onNoLabel="Cancel" } = props;
  const { styleContainer, styleCancelButton, styleAcceptButton } = props;
  const { isLoading } = props;

  return (                                  
      <ModalButtonsContainer style={styleContainer}>
          {props.children || <div></div>}
          <div style={{ display:"flex", justifyContent:"flex-end", alignItems:"center" }}>
              <Button
                  type="none"
                  style={{ 
                      ...styleCancelButton, 
                      marginRight: 15,
                      cursor: (isLoading)? "auto" : "pointer"
                  }}
                  onClick={() => {
                      onNoFunction();
                      context.ToggleModal();
                  }}
                  text={onNoLabel}
              />
              <Button
                  type="dark"
                  style={styleAcceptButton}
                  onClick={onYesFunction}
                  isLoading={isLoading}
                  text={onYesLabel}
              />
          </div>
      </ModalButtonsContainer>
  )
}

export default _ModalButtonsContainer;
//==============================================================================
import React, { useState, useEffect } from "react";
//==============================================================================
import ModalButtonsContainer from "./ModalButtonsContainer.jsx";
//==============================================================================

function _ModalConfirm (props) {
    
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
      return () => setIsLoading(false);
    }, []);

    const { onYesLabel, onNoLabel, onYesFunction, onNoFunction } = props;
    const { isSecondLayerModal } = props;

    return (
        <div>
            {props.children}
            <ModalButtonsContainer 
                isSecondLayerModal={isSecondLayerModal}
                isLoading={isLoading}
                onNoLabel={onNoLabel}
                onYesLabel={onYesLabel}
                onNoFunction={onNoFunction}
                // modal is not closed after onYesFunction, must be closed by view using modal
                onYesFunction={() => {
                    setIsLoading(true);
                    onYesFunction();
                }}
            />
        </div>
    );
};

export default _ModalConfirm;
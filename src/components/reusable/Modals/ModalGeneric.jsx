//==============================================================================
import React, { useContext } from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
//==============================================================================
import RecipeContext from "../../../context/recipe-context";

import {
    ModalHead,
    ModalTitle,
    ModalSubTitle,
    ModalDescription,
    ModalCloseIcon,
    ModalContent,
} from "./style.js";
//==============================================================================

Modal.setAppElement('#root')

function _ModalGeneric () {

    const context = useContext(RecipeContext);

    const closeModal = () => {
      context.ToggleModal({
        isOpened: false,
        // modal options
        title: "",
        subtitle: "",
        description: "",
        content: undefined,
        style: {},            
        noEscape: false,            
      });
    }

    const { isOpened } = context.modalParameters;
    // Modal options
    const { title, subtitle, description } = context.modalParameters;
    const { content, style, noEscape } = context.modalParameters;

    return (                                  
        <Modal
            isOpen={isOpened}
            contentLabel={title}
            style={{
                overlay: {
                    zIndex                : '100000000',
                },
                content : {
                    width                 : '600px',
                    top                   : '50%',
                    left                  : '50%',
                    right                 : 'auto',
                    bottom                : 'auto',
                    marginRight           : '-50%',
                    padding               : '0px',
                    transform             : 'translate(-50%, -50%)',
                    border                : 'none',
                    overflow              : 'hidden',
                    boxShadow             : '1px 2px 22px 0px rgba(0,0,0,0.57)',   
                    ...style,
                }                    
            }}
        >
            <ModalHead>
                <ModalTitle> {title} </ModalTitle>
                {subtitle && <ModalSubTitle> {subtitle} </ModalSubTitle>}
                {description && <ModalDescription> {description} </ModalDescription>}
                {!noEscape && <ModalCloseIcon onClick={closeModal}>
                  <FontAwesomeIcon icon={faTimes} />
                </ModalCloseIcon>}
            </ModalHead>

            {content && <ModalContent>
                { content } 
            </ModalContent>}
        </Modal>
    )
}


export default _ModalGeneric;
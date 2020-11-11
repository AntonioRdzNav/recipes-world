import styled from 'styled-components'


export const ModalHead = styled.div` 
    background-color: ${() => window.colors["dark"]};
    padding: 20px;
    position: relative;
    /* border */
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`
export const ModalTitle = styled.h1` 
    color: white;
    font-size: 20px;
    font-weight: 700;
`
export const ModalSubTitle = styled.div` 
    margin-top: 25px;
    color: ${() => window.colors["info"]};
    font-size: 16px;
    font-weight: 600;
`
export const ModalDescription = styled.p` 
    margin-top: 8px;
    color: white;
    font-size: 14px;
    font-weight: 300;
`
export const ModalCloseIcon = styled.div` 
    /* icon */
    & i{
        margin-bottom: 2px;
        margin-right: 0.5px;
        font-size: 15px;
        color: white;
    }
    /* position */
    position: absolute;
    top: 7px;
    right: 7px;  
    /* flex */
    display: flex;
    justify-content: center;
    align-items: center;
    /* circle */
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${() => window.colors["danger"]};
    /* animation */
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
        background-color: ${() => window.colors["danger--hover"]};
    }
`
export const ModalContent = styled.div` 
    width: 100%;
    overflow: hidden;
`
export const ModalButtonsContainer = styled.div` 
    padding: 20px;
    padding-bottom: 10px;
    width: 100%;
    /* flex */
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border */
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`
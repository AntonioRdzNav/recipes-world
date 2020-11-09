import styled, {css} from 'styled-components'



export const InputContainer = styled.div`  
    width: 100%;
    min-height: 50px;
    background-color: ${() => window.colors["app__lightgray"]};
    padding: 5px 0;
    margin-bottom: 10px;
    border-radius: 5px;
    ${props => props.error && css`
        border: ${() => window.colors["danger"]} solid 2px;
    `}
    ${props => props.success && css`
        border: ${() => window.colors["success"]} solid 2px;
    `}
    ${props => props.theme.isLoading && css`
        opacity: 0.6;
    `}
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`
export const InputLabel = styled.label`  
    width: 100%;
    padding: 0 10px;
    transition: all 0.2s;
    color: ${() => window.colors["typo__dark"]};   
    font-weight: 400;
    ${props => (props.theme.isFocused || props.theme.hasValue) && css`
        color: ${() => window.colors["info"]};
        font-weight: 500;
    `}
    /* flex */
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const Input = styled.input` 
    width: 100%;
    padding: 0 10px;
    margin: 0;
    border: none;
    color: ${() => window.colors["info"]}; 
    background-color: transparent !important;
    font-weight: 400;
    font-size: 16px;    
    &::placeholder{
        font-weight: 100;
        font-size: 16px;
    }
    &:focus{
        border: none;
    }
`
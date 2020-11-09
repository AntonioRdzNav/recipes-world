import styled, {css} from 'styled-components'


export const Button = styled.button`
	margin: 4px 2px;
	border-radius: 5px;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
    padding: 4px 8px;


/* Colors */
    color: ${props => props.type==="success"? "white" :
                    props.type==="info"? "white" :
                    props.type==="danger"? "white" :
                    props.type==="warning"? window.colors["typo__dark"] :
                    props.type==="dark"? "white" :
                    props.type==="white"? window.colors["typo__dark"] :
                    props.type==="app__lightgray"? window.colors["typo__dark"] :  window.colors["typo__dark"]
    };
    background-color: ${props => window.colors[props.type] || "transparent"};   
    border: none;
    ${props => (!props.type || props.type==="none") && css`
        border: 1px solid #cacaca
    `};


/* hover effect */
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
        ${props => (!props.isLoading && !props.disabled) && css`
            background-color: ${props => window.colors[`${props.type}--hover`] || "transparent"};   
        `}   
    }


/* isLoading style */
    ${props => props.isLoading && css`
        cursor: auto;
        opacity: 0.4;
    `}
    ${props => props.disabled && css`
        cursor: auto;
    `}
    ${props => props.error && css`
        border: ${() => window.colors["danger"]} solid 3px;
    `}
    ${props => props.success && css`
        border: ${() => window.colors["success"]} solid 3px;
    `}    

`

import styled from 'styled-components'


export const ReactMenu = styled.div`
/* menu styles */
    & .ReactMenu__AccountMenu{
        color: white;
        border-radius: 5px;
        font-weight: 400;
        width: ${props => props.theme.widthMenu? props.theme.widthMenu : "180px"};
        background-color: ${props => props.theme.backgroundColorMenu};
    }
/* dropdown styles */
    & .ReactMenu__AccountDropdown{
        border-radius: 5px;
        width: ${props => props.theme.widthMenu? props.theme.widthMenu : "180px"};
    }
    & .ReactMenu__AccountDropdown > span{
        width: 100%;
    }
    & .ReactMenu__AccountDropdown:hover{
        background-color: ${props => props.theme.backgroundColorMenu__Hover};
    }   
/* dropdown icon style */
    & .ReactMenu__AccountDropdownIcon{
        width: 12px;
        height: 12px;
        stroke-width: 50px;
        fill: white;
        color: white;
    }
/* dropdown items styles */
    & .ReactMenu__AccountDropdownItems{
        width: ${props => props.theme.widthMenu? props.theme.widthMenu : "180px"};
        border-radius: 5px;
        border: none;
        position: absolute;
        z-index: 3;
        color: ${props => props.theme.dropdownItemsColor};
        box-shadow:
            0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 20px 20px rgba(0, 0, 0, 0.12)
        ;
        /* overflow */
        max-height: 189px;
        overflow: auto;
    }
    & .ReactMenu__AccountDropdownItems > div:first-child{
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
    & .ReactMenu__AccountDropdownItems > div:last-child{
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }  
    & .ReactMenu__AccountDropdownItems > div{
        /* animation */
        background-color: white;
        transition: all 0.2s;
        &:hover {
            background-color: ${() => window.colors["app__lightgray"]};
        }
    }  
`;
import styled, {css} from 'styled-components'


export const NavBar = styled.div`
    height: 60px;
    background-color: ${() => window.colors["dark"]};
    padding: 0 20px;
    /* sticky */
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    z-index: 1;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    
`
export const LinksContainer = styled.ul`
    padding: 10px 0;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* reset */
    list-style: none;
`
export const NavBarLink = styled.li`
    color: #bbbbbb;
    margin-left: 20px;
    font-weight: 500;
    &:hover {
        color: white;
        font-weight: 600;
    }
    ${props => props.activeTab && css`
        color: white;
        font-weight: 900;
    `}
`


export const UserData = styled.div`
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;  
`
export const UserAvatar = styled.img`
    width: 30px;
    height: auto;
    border-radius: 50%;
    margin-right: 10px;
`
export const UserName = styled.div`
    font-size: 14px;
`
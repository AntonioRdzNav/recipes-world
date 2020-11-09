import styled, {css} from 'styled-components'


export const NavBar = styled.div`
    height: 60px;
    background-color: ${() => window.colors["dark"]};
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
    padding: 10px 20px;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* reset */
    list-style: none;
`
export const Home = styled.li`
    color: white;
    font-size: 35px;
    margin-right: 20px;
    /* animation */
    transition: all 0.1s;
    &:hover {
        transform: scale(1.05);
    }
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
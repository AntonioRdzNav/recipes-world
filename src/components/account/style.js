import styled from 'styled-components'


export const AccountPage = styled.div`
    width: 100%;
    min-height: calc(100vh - 60px); 
    margin-top: 50px;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;    
`
export const AccountContainer = styled.div`
    width: 500px;
    background-color: ${() => window.colors["app__lightgray--hover"]};
    padding: 20px;
    border-radius: 10px;    
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;        
`
export const AccountTitle = styled.h2`
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 30px;
`
export const AccountLink = styled.div`
    font-size: 14px;
    color: ${() => window.colors["info"]};
    font-weight: 700;
    text-decoration: underline;
    align-self: flex-start;
    cursor: pointer;
`
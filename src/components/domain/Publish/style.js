import styled from 'styled-components'


export const PublishPage = styled.div`
    width: 100%;
    min-height: calc(100vh - 60px); 
    margin-top: 50px;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;    
`
export const PublishContainer = styled.div`
    width: 800px;
    background-color: ${() => window.colors["app__lightgray--hover"]};
    padding: 20px;
    border-radius: 10px;    
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;        
`
export const PublishTitle = styled.h2`
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 30px;
`

import styled from 'styled-components'


export const CommentContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    padding: 5px 15px;
    background-color: white;
    margin-bottom: 15px;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;    
`
export const CommentAuthorData = styled.div`
    margin-bottom: 10px;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;  
`
export const CommentAuthorAvatar = styled.img`
    width: 30px;
    height: auto;
    border-radius: 50%;
    margin-right: 10px;
`
export const CommentAuthorName = styled.div`
    font-weight: 800;
    font-size: 16px;
`
export const CommentText = styled.div`
    font-weight: 400;
    font-size: 14px;
`
import styled from 'styled-components'


export const ReviewContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    padding: 5px 15px;
    background-color: white;
    margin: 15px 0;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;    
`
export const ReviewAuthorData = styled.div`
    margin-bottom: 5px;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;  
`
export const ReviewAuthorAvatar = styled.img`
    width: 20px;
    height: auto;
    border-radius: 50%;
    margin-right: 10px;
`
export const ReviewAuthorName = styled.div`
    font-weight: 800;
    font-size: 14px;
`
export const ReviewText = styled.div`
    font-weight: 400;
    font-size: 13px;
`
export const ReviewDate = styled.div`
    font-weight: 100;
    font-size: 11px;
`
export const ReviewAdditionalData = styled.div`
    width: 100%;
    align-self: center;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;      
`
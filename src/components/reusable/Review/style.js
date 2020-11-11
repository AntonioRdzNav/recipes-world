import styled, {css} from 'styled-components'


export const ReviewContainer = styled.div`
    width: 100%;
    border-radius: 5px;
    padding: 5px 15px;
    background-color: white;
    margin: 15px 0;
    position: relative;
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
export const Icon = styled.i`
    font-size: 13px;
    /* animation */
    transition: all 0.1s;
    cursor: pointer;
    &:hover {
      font-size: 15px;
    }
`
export const RemoveIcon = styled(Icon)`
    color: ${() => window.colors["danger"]};
    position: absolute;
    right: 4px;
    top: 10%;
    transform: translateY(-10%);
`
export const CancelIcon = styled(Icon)`
    color: ${() => window.colors["app__lightgray"]};
    position: absolute;
    right: 7px;
    top: 10%;
    transform: translateY(-10%);
`
export const EditIcon = styled(Icon)`
    color: ${() => window.colors["info"]};
    position: absolute;
    right: 2px;
    top: 40%;
    transform: translateY(-40%);
`
export const RatingInput = styled.div`
    width: 100%;
    background-color: white;
    ${props => props.error && css`
        border: ${() => window.colors["danger"]} solid 2px;
    `}
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;  
`
import styled, { css } from 'styled-components'


export const RecipeView = styled.div`
    width: 100%;
    padding: 20px;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* overflow */
    min-height: calc(100vh - 60px);
    position: relative;
    overflow: hidden;    
`

export const RecipeMainInformation = styled.div`
    background-color: ${() => window.colors["app__lightgray"]};
    padding: 20px;
    padding-bottom: 0px;
    /* overflow */
    position: absolute;
    width: 30%;
    top: 0px;
    left: 0px;
    height: calc(100vh - 60px);
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;    
`
export const RecipeImage = styled.img`
    width: 100%;
    height: auto;
    margin: 0 auto;
    margin-bottom: 10px;
`
export const RecipeName = styled.div`
    font-weight: 800;
    font-size: 16px;
    /* truncate text */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const RecipeDescription = styled.div`
    font-weight: 400;
`
export const RecipeAuthorData = styled.div`
    width: 100%;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;  
`
export const RecipeDate = styled(RecipeAuthorData)`
    margin-top: 10px;
`
export const RecipeAuthorAvatar = styled.img`
    width: 30px;
    height: auto;
    border-radius: 50%;
    margin-right: 10px;
`
export const RecipeAuthorUsername = styled.div`
    /* truncate text */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const ButtonsContainer = styled.div`
    position: absolute;
    right: 0px;
    bottom: 20px;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;  
`
//////////////////////////////////////////////////////////////
//                          DETAILS
//////////////////////////////////////////////////////////////
export const RecipeDetails = styled.ol`
    /* overflow */
    position: absolute;
    width: 45%;
    top: 0px;
    left: 30%;
    height: calc(100vh - 60px);
`
export const TitleLabel = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 600;
`
export const RecipeSteps = styled.div`
    padding: 20px;
    border-top-left-radius: 20px;     
    border-bottom-left-radius: 20px;       
    /* overflow */
    position: absolute;
    width: 85%;
    top: 0px;
    height: calc(100vh - 60px);
    overflow-y: auto;
    /* animation */
    transition: all 0.3s;
    ${props => !props.isViewing && css`
      cursor: pointer;
      opacity: 0.6;
      left: 85%;
      background-color: ${() => window.colors["app__lightgreen"]};        
    `}
    ${props => props.isViewing && css`
      cursor: auto;
      opacity: 1;
      left: 15%;
      background-color: white;        
    `}    
`
export const Step = styled.li`
    margin-left: 20px;
    margin-bottom: 20px;
    list-style: decimal;
    font-size: 15px;
`
export const RecipeIngredients = styled.ul`
    padding: 20px;  
    /* overflow */
    position: absolute;
    width: 85%;
    left: 0%;
    top: 0px;
    height: calc(100vh - 60px);
    overflow-y: auto;
    /* animation */
    transition: all 0.3s;
    ${props => !props.isViewing && css`
      cursor: pointer;
      opacity: 0.6;
      background-color: ${() => window.colors["app__lightblue"]};    
    `}
    ${props => props.isViewing && css`
      cursor: auto;
      opacity: 1;
      background-color: white;       
    `}
`
export const IngredientData = styled(Step)`
    width: 100%;
    list-style: disc;
`
export const IngredientName = styled.div`
    display: inline;
    margin-right: 5px;
`
export const IngredientQuantity = styled.div`
    display: inline;
    margin-left: 5px;
`
//////////////////////////////////////////////////////////////
//                        REVIEWS
//////////////////////////////////////////////////////////////
export const RecipeReviews = styled.div`
    padding: 20px;
    padding-top: 0px;
    background-color: ${() => window.colors["app__lightgray"]};
    /* overflow */
    position: absolute;
    width: 25%;
    top: 0px;
    right: 0px;
    height: calc(100vh - 60px);
    overflow-y: scroll;
`
export const ReviewStickyContainer = styled.div`
    padding-top: 10px;
    background-color: ${() => window.colors["app__lightgray"]};
    /* sticky */
    position: sticky;
    position: -webkit-sticky;
    top: 0px;
    z-index: 1;
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
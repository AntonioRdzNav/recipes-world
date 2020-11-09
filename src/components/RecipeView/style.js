import styled from 'styled-components'


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
    width: 40%;
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
    width: 80%;
    height: auto;
    margin: 0 auto;
    margin-bottom: 30px;
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
export const RecipeSteps = styled.ol`
    padding: 10px 30px;
    /* overflow */
    position: absolute;
    width: 60%;
    top: 0px;
    right: 0px;
    height: calc(100vh - 60px);
`
export const Step = styled.li`
    margin-bottom: 20px;
    list-style: decimal;
`
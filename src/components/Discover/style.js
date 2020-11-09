import styled, {css} from 'styled-components'


export const Discover = styled.div`
    width: 100%;
    padding: 20px;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

export const Filters = styled.div`
    width: 100%;
    background-color: lightblue;
    padding: 10px 20px;
    margin-bottom: 20px;
    min-height: 150px;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const Recipes = styled.div`
    width: 100%;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;      
`

export const RecipeContainer = styled.div`
    width: 300px;
    padding: 20px;
    margin: 10px;
    background-color: ${() => window.colors["app__lightgray"]};
    border-radius: 5px;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;  
    /* animation */
    opacity: 1;
    cursor: pointer !important;
    transition: all 0.3s;
    &:hover {
        transform: scale(1.01);
        opacity: 0.8;
    }
`

export const RecipeImage = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 10px;
`

export const RecipeName = styled.div`
`

export const RecipeDescription = styled.div`
    font-weight: 300;
`
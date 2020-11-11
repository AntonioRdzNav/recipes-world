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
    align-items: flex-start;        
`
export const PublishTitle = styled.h2`
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 30px;
`
export const RecipeLabel = styled.div`
    align-self: flex-start;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 10px;
`
export const RemoveIcon = styled.i`
    /* display: none; */
    color: ${() => window.colors["danger"]};
    position: absolute;
    right: 6px;
    font-size: 14px;
    top: calc(50%);
    transform: translateY(-50%);
    /* animation */
    transition: all 0.1s;
    cursor: pointer;
    &:hover {
      font-size: 16px;
    }
`
// Steps
export const AddRecipeStep = styled.div`
    margin-top: 20px;
    width: 100%;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;     
`
export const RecipeSteps = styled.div`
    background-color: ${() => window.colors["app__lightgray--hover"]};
    width: 100%;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;     
`
export const StepsContainer = styled.ol`
    align-self: flex-start;
    width: 100%;
    padding: 0 15px;
    padding-left: 30px;
    background: ${() => window.colors["app__lightgreen"]};
`
export const Step = styled.li`
    position: relative;
    list-style: decimal;
    font-size: 15px;
    margin: 15px 0;
    /* &:hover i{
      display: block;
    } */
`
// Ingredients
export const AddRecipeIngredient = styled(AddRecipeStep)`   
`
export const RecipeIngredients = styled(RecipeSteps)`  
`
export const IngredientsContainer = styled.ul`
    align-self: flex-start;
    width: 100%;
    padding: 0 15px;
    padding-left: 30px;
    background: ${() => window.colors["app__lightblue"]};
`
export const Ingredient = styled(Step)`
`

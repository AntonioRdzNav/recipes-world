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
export const RecipeSteps = styled.div`
    background-color: ${() => window.colors["app__lightgray--hover"]};
    width: 100%;
    /* flex */
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;     
`
export const AddRecipeStep = styled.div`
    margin-top: 20px;
    width: 100%;
    /* flex */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;     
`
export const StepsLabel = styled.div`
    align-self: flex-start;
    padding: 0 10px;
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 10px;
`
export const StepsContainer = styled.ol`
    align-self: flex-start;
    align-self: flex-start;
    width: 100%;
    padding: 0 15px;
    padding-left: 30px;
    background: white;
`
export const Step = styled.li`
    list-style: decimal;
    font-size: 15px;
    margin: 15px 0;
`

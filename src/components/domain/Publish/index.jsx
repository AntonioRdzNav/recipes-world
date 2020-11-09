//==============================================================================
import React, { useState } from "react";
import _ from "lodash";
//==============================================================================
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import { isAnyEmpty } from "../../../utils/Helpers"

import {
    PublishPage,
    PublishContainer,
    PublishTitle,
    RecipeSteps,
    AddRecipeStep,
    StepsLabel,
    StepsContainer,
    Step,
} from "./style"
//==============================================================================

function _Publish() {

	const [recipeName, setRecipeName] = useState("");
	const [recipeImageUrl, setRecipeImageUrl] = useState("");
	const [recipeDescription, setRecipeDescription] = useState("");
	const [newStepText, setNewRecipeStep] = useState("");
	const [recipeSteps, setRecipeSteps] = useState([]);
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);    

    const addRecipeStep = () => {
        const newStep = {
            text: newStepText
        }
        setRecipeSteps(_.concat(recipeSteps, [newStep]))
        setNewRecipeStep("");
    }
    const publishRecipe = () => {
        if(isAnyEmpty(recipeName, recipeImageUrl, recipeDescription) || _.isEmpty(recipeSteps)) {
            setIsInputMissing(true);
            return;
        }
        setIsInputMissing(false);
        setIsLoading(true);
        // create doc
        setRecipeName("");
        setRecipeImageUrl("");
        setRecipeDescription("");
        setRecipeSteps([]);
        setIsLoading(false);
        // redirect to another url
    }
    
  return (
    <PublishPage>
        <PublishContainer>

            <PublishTitle> Publish new Recipe </PublishTitle>
            <Input 
                label="RecipeName"
                required={true}
                onChange={(e) => setRecipeName(e.target.value)}
                value={recipeName}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            <Input 
                label="Recipe Image URL"
                required={true}
                onChange={(e) => setRecipeImageUrl(e.target.value)}
                value={recipeImageUrl}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            <Input 
                label="Recipe Description"
                required={true}
                onChange={(e) => setRecipeDescription(e.target.value)}
                value={recipeDescription}
                checkForMissingField={isInputMissing}
                isLoading={isLoading}
            />
            
            <RecipeSteps>
                <AddRecipeStep>
                    <Input 
                        label="Write a new recipe step..."
                        placeholder="Step"
                        onChange={(e) => setNewRecipeStep(e.target.value)}
                        value={newStepText}
                        style={{ background:"white", width:"90%" }}
                        error={isInputMissing && _.isEmpty(recipeSteps)}
                    />
                    <Button 
                        type="info"
                        onClick={addRecipeStep}
                        text="Add"			
                    />                
                </AddRecipeStep>
                {!_.isEmpty(recipeSteps) && <>
                    <StepsLabel> Steps: </StepsLabel>
                    <StepsContainer>
                        {_.map(recipeSteps, (step, i) => {
                            const { text } = step;
                            return <Step key={i}>
                                {text}
                            </Step>
                        })}
                    </StepsContainer>
                </>}
            </RecipeSteps>

            <Button 
                type="success"
                onClick={publishRecipe}
                isLoading={isLoading}
                text="Publish"
                style={{ width:"100%", padding:"10px 0", fontSize:16, marginTop:30 }}
            />            

        </PublishContainer>
    </PublishPage>
  );
}

export default _Publish;

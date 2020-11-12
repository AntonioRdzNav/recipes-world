//==============================================================================
import React, { useState, useContext } from "react";
import { useHistory, Redirect } from 'react-router-dom';
import _ from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
//==============================================================================
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import RecipeContext from "../../../context/recipe-context";

import { isAnyEmpty } from "../../../utils/Helpers";

import { LOGIN__ROUTE_PATH } from "../../../data/urls";

import {
    PublishPage,
    PublishContainer,
    PublishTitle,
    RecipeLabel,
    RemoveIcon,
    // Ingredients
    AddRecipeIngredient,
    RecipeIngredients,
    IngredientsContainer,
    Ingredient,
    // Steps
    RecipeSteps,
    AddRecipeStep,
    StepsContainer,
    Step,
} from "./style"
//==============================================================================

function _Publish() {

  const context = useContext(RecipeContext);
  const history = useHistory();

  // recipe main info 
	const [recipeName, setRecipeName] = useState("");
	const [recipeImageUrl, setRecipeImageUrl] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  // steps
	const [newStepText, setNewRecipeStep] = useState("");
  const [recipeSteps, setRecipeSteps] = useState([]);
  const [isStepInputMissing, setIsStepInputMissing] = useState(false);
  // ingredients
	const [newIngredientName, setNewIngredientName] = useState("");
	const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [isIngredientInputMissing, setIsIngredientInputMissing] = useState(false);
  // UX
	const [isInputMissing, setIsInputMissing] = useState(false);
	const [isLoading, setIsLoading] = useState(false);    

  const addRecipeStep = () => {
    if(isAnyEmpty(newStepText)) {
      setIsStepInputMissing(true);
      return;
    }
    setIsIngredientInputMissing(false);
    setIsStepInputMissing(false);
    // set new steps
    setRecipeSteps(_.concat(recipeSteps, [newStepText]))
    setNewRecipeStep("");
  }
  const removeStep = (index) => {
    let modifiedSteps = _.clone(recipeSteps);
    modifiedSteps.splice(index, 1);
    setRecipeSteps(modifiedSteps);
  }
  const addRecipeIngredient = () => {
    if(isAnyEmpty(newIngredientName, newIngredientQuantity)) {
      setIsIngredientInputMissing(true);
      return;
    }
    setIsIngredientInputMissing(false);
    setIsStepInputMissing(false);
    // set new ingredients
    const newIngredient = {
        name: newIngredientName,
        quantity: newIngredientQuantity,
    }
    setRecipeIngredients(_.concat(recipeIngredients, [newIngredient]))
    setNewIngredientName("");
    setNewIngredientQuantity("");
  }
  const removeIngredient = (index) => {
    let modifiedIngredients = _.clone(recipeIngredients);
    modifiedIngredients.splice(index, 1);
    setRecipeIngredients(modifiedIngredients);      
  }    
  const publishRecipe = () => {
      if(isAnyEmpty(recipeName, recipeImageUrl, recipeDescription) || _.isEmpty(recipeSteps) || _.isEmpty(recipeIngredients)) {
          setIsInputMissing(true);
          return;
      }
      setIsInputMissing(false);
      setIsLoading(true);
      // create recipe
      function cleanForm() {
        setRecipeName("");
        setRecipeImageUrl("");
        setRecipeDescription("");
        setRecipeSteps([]);
        setIsLoading(false);
      }
      const { name:authorName, avatar:authorAvatar, id:authorId } = (context.loggedUser || {});
      const newRecipe = {
        name: recipeName, 
        description: recipeDescription,
        image: {
          url: recipeImageUrl,
          size: 0,
          type: "image/jpeg",
          filename: "recipe.jpg",
        },
        authorName,
        authorAvatar,
        authorId,       
        steps: recipeSteps,
        ingredient_keys: _.map(recipeIngredients, ingredient => ingredient.name),
        avg_rating: 0,
        total_reviews: 0,
      }
      context.CreateRecipe(newRecipe, recipeIngredients)
        .then((newRecipe) => {
          cleanForm();
          context.TriggerNotification("success", "Recipe successfully created.")
          history.push(`/recipe/${_.get(newRecipe, "id")}`);
        })
        .catch(() => {
          cleanForm();
          context.TriggerNotification("error", "Could not create the Recipe.")
        });
  }

  if(!context.isLoggedIn) {
    return <Redirect to={LOGIN__ROUTE_PATH} />      
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
            style={{ width:"40%" }}
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

        <RecipeIngredients>
          <AddRecipeIngredient>
              <Input
                  label="New ingredient"
                  placeholder="Ingredient name..."
                  onChange={(e) => setNewIngredientName(e.target.value)}
                  value={newIngredientName}
                  style={{ background:"white", width:"60%" }}
                  checkForMissingField={isIngredientInputMissing}
                  error={isInputMissing && _.isEmpty(recipeIngredients)}
                  onKeyDown={(e) => e.key==="Enter" && addRecipeIngredient() }
              />
              <Input
                  label="Quanity"
                  placeholder="100 ml"
                  onChange={(e) => setNewIngredientQuantity(e.target.value)}
                  value={newIngredientQuantity}
                  style={{ background:"white", width:"26%" }}
                  checkForMissingField={isIngredientInputMissing}
                  error={isInputMissing && _.isEmpty(recipeIngredients)}
                  onKeyDown={(e) => e.key==="Enter" && addRecipeIngredient() }
              />
              <Button 
                  type="info"
                  onClick={addRecipeIngredient}
                  text="Add"			
              />                
          </AddRecipeIngredient>
          {!_.isEmpty(recipeIngredients) && <>
              <RecipeLabel> Ingredients: </RecipeLabel>
              <IngredientsContainer>
                  {_.map(recipeIngredients, (ingredient, i) => {
                      const { name, quantity, id } = ingredient;
                      return <Ingredient key={id || i}>
                          {`${name} : ${quantity}`}
                          <RemoveIcon onClick={() => removeIngredient(i)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </RemoveIcon>
                      </Ingredient>
                  })}
              </IngredientsContainer>
          </>}
        </RecipeIngredients>            
      
        <hr style={{ width:"100%", border:"0.5px #696969 solid", marginTop:25 }}/>  
        
        <RecipeSteps>
          <AddRecipeStep>
              <Input 
                  label="New recipe step"
                  placeholder="Explain step..."
                  onChange={(e) => setNewRecipeStep(e.target.value)}
                  value={newStepText}
                  style={{ background:"white", width:"90%" }}
                  checkForMissingField={isStepInputMissing}
                  error={isInputMissing && _.isEmpty(recipeSteps)}
                  onKeyDown={(e) => e.key==="Enter" && addRecipeStep() }
              />
              <Button 
                  type="info"
                  onClick={addRecipeStep}
                  text="Add"			
              />                
          </AddRecipeStep>
          {!_.isEmpty(recipeSteps) && <>
              <RecipeLabel> Steps: </RecipeLabel>
              <StepsContainer>
                  {_.map(recipeSteps, (step, i) => {
                      return <Step key={i}>
                          {step}
                          <RemoveIcon onClick={() => removeStep(i)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </RemoveIcon>                          
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

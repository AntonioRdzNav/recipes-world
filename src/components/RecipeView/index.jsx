//==============================================================================
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
//==============================================================================
import {
	RecipeView,
	RecipeMainInformation,
	RecipeImage,
	RecipeName,
	RecipeDescription,
	RecipeSteps,
	Step,
} from "./style"
//==============================================================================

function _RecipeView() {

	const [recipeRating, setRecipeRating] = useState(0);

  const ratingChanged = (newRating) => {
    console.log(newRating);
		setRecipeRating(newRating)
  };
    
  return (
    <RecipeView>
			<RecipeMainInformation>
				<RecipeImage src="https://saboryestilo.com.mx/wp-content/uploads/2019/08/como-preparar-pozole-rojo-1-1200x720.jpg" alt="Recipe Image"/>
				<RecipeName> Pozole Rojo </RecipeName>
				<RecipeDescription> This is a recipe to cook Pozole Rojo, the steps are detailed here: </RecipeDescription>
				<ReactStars
					count={5}
					value={recipeRating}
					isHalf={true}
					size={24}
					activeColor={window.colors["app__rateStarColor"]}
					onChange={ratingChanged}
				/>  
			</RecipeMainInformation>
			<RecipeSteps>
				<Step>
					This is step 1
				</Step>
				<Step>

					This is step 2
				</Step>
			</RecipeSteps>
    </RecipeView>
  );
}

export default _RecipeView;

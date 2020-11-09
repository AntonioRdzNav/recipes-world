//==============================================================================
import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
//==============================================================================
import RecipeComment from "../../reusable/Comment/index.jsx"

import {
	RecipeView,
	RecipeMainInformation,
	RecipeImage,
	RecipeName,
	RecipeDescription,
	RecipeSteps,
	Step,
    RecipeComments,
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
			<RecipeComments>
                <RecipeComment 
                    authorAvatar="https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI"
                    authorName="Antonio Rodriguez"
                    commentText="Really tasty, but I would say that the chilli used may be wrong."
                />
			</RecipeComments>
    </RecipeView>
  );
}

export default _RecipeView;

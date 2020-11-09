//==============================================================================
import React from "react";
import ReactStars from "react-rating-stars-component";
//==============================================================================
import {
  Discover,
  Filters,
  Recipes,
  RecipeContainer,
  RecipeImage,
  RecipeName,
  RecipeDescription,
} from "./style"
//==============================================================================

function _Discover() {

  // const ratingChanged = (newRating) => {
  //   console.log(newRating);
  // };
    
  return (
    <Discover>
      <Filters>
        Filters
      </Filters>
      <Recipes>

        <RecipeContainer>
          <RecipeImage src="https://saboryestilo.com.mx/wp-content/uploads/2019/08/como-preparar-pozole-rojo-1-1200x720.jpg" alt="Recipe Image"/>
          <RecipeName> Recipe Name </RecipeName>
          <RecipeDescription> This is a description </RecipeDescription>
          <ReactStars
            count={5}
            value={4.5}
            isHalf={true}
            edit={false}
            size={24}
            activeColor={window.colors["app__rateStarColor"]}
          />          
        </RecipeContainer>

      </Recipes>
    </Discover>
  );
}

export default _Discover;

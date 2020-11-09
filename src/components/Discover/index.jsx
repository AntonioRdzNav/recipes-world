//==============================================================================
import React from "react";
import { useHistory } from 'react-router-dom';
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

	const history = useHistory();
    
  return (
    <Discover>
      <Filters>
        Filters
      </Filters>
      <Recipes>

        <RecipeContainer onClick={() => history.push(`/recipe/${"pozole"}`)}>
          <RecipeImage src="https://saboryestilo.com.mx/wp-content/uploads/2019/08/como-preparar-pozole-rojo-1-1200x720.jpg" alt="Recipe Image"/>
          <RecipeName> Pozole Rojo </RecipeName>
          <RecipeDescription> This is a recipe to cook Pozole Rojo, the steps are detailed here:  </RecipeDescription>
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

//==============================================================================
import React, { useContext, useEffect } from "react";
import _ from "lodash";
import { useHistory } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
//==============================================================================
import RecipeContext from "../../../context/recipe-context"

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

  const context = useContext(RecipeContext)
  const history = useHistory();
  
  useEffect(() => {
    const unsubscribeFromGetAllRecipes = context.GetAllRecipes();
    return () => {
      unsubscribeFromGetAllRecipes && unsubscribeFromGetAllRecipes();
    }
  }, [])
    
  return (
    <Discover>
      <Filters>
        Filters
      </Filters>
      <Recipes>

        {_.map(context.recipes, (recipe) => {
          const { id, image, name, description, avg_rating } = recipe;
          return (
            <RecipeContainer key={id} onClick={() => history.push(`/recipe/${id}`)}>
              <RecipeImage src={image} alt="Recipe Image"/>
              <RecipeName> {name} </RecipeName>
              <RecipeDescription> {description} </RecipeDescription>
              <ReactStars
                count={5}
                value={avg_rating}
                isHalf={true}
                edit={false}
                size={24}
                activeColor={window.colors["app__rateStarColor"]}
              />          
            </RecipeContainer>
          )
        })}

      </Recipes>
    </Discover>
  );
}

export default _Discover;

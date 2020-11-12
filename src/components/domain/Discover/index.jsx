//==============================================================================
import React, { useContext, useEffect } from "react";
import _ from "lodash";
import { useHistory } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
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
        
      </Filters>
      <Recipes>

        {_.map(context.recipes, (recipe) => {
          const { id, image, name, description, avg_rating, total_reviews } = recipe;
          return (
            <RecipeContainer key={id} onClick={() => history.push(`/recipe/${id}`)}>
              <RecipeImage src={_.get(image, "url")} alt="Recipe Image"/>
              <RecipeName> {name} </RecipeName>
              <RecipeDescription> {description} </RecipeDescription>
              <div style={{ background:"white", padding:"4px", borderRadius:5, marginTop:5 }}>
                <StarRatings
                  starDimension="19px"
                  starSpacing="2px"
                  rating={avg_rating}
                  starRatedColor={window.colors["app__rateStarColor"]}
                  numberOfStars={5}
                  name='rating'
                />  
                <span style={{ marginLeft:5,fontSize:14 }}> {`(${total_reviews || 0})`} </span>                                
              </div>
            </RecipeContainer>
          )
        })}

      </Recipes>
    </Discover>
  );
}

export default _Discover;

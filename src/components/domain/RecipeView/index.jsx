//==============================================================================
import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from 'react-router-dom';
import _ from "lodash";
import moment from "moment";
import StarRatings from 'react-star-ratings';
//==============================================================================
import RecipeReview from "../../reusable/Review/index.jsx";
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";
import ModalConfirm from "../../reusable/Modals/ModalConfirm.jsx";

import RecipeContext from "../../../context/recipe-context";

import { isAnyEmpty, convertTimestampToDate } from "../../../utils/Helpers"

import {
  DISCOVER__ROUTE_PATH,
} from "../../../data/urls"

import {
  RecipeView,
  // main info
	RecipeMainInformation,
	RecipeImage,
	RecipeName,
	RecipeDescription,
  RecipeAuthorData,
  RecipeAuthorAvatar,
  RecipeAuthorUsername,
  RecipeDate,
  ButtonsContainer,
  // details
  RecipeDetails,
  TitleLabel,
  RecipeIngredients,
  IngredientData,
  IngredientName,
  IngredientQuantity,
	RecipeSteps,
  Step,
  // reviews
  ReviewStickyContainer,
  RatingInput,
  RecipeReviews,
} from "./style"
//==============================================================================

function _RecipeView() {

  const context = useContext(RecipeContext);
  const history = useHistory();
  const { recipeId } = useParams();

  const { name:recipeName, description, image, steps, avg_rating } = (context.selectedRecipe || {});
  const { total_reviews, createdAt, authorName, authorAvatar } = (context.selectedRecipe || {});

	const [newRecipeRating, setNewReviewRating] = useState(null);
  const [newReviewText, setNewReviewText] = useState("");
  // UX
  const [isReviewTextMissing, setIsReviewTextMissing] = useState(false);
  const [isViewingIngredients, setIsViewingIngredients] = useState(true);
  const [isRecipeAuthor, setIsRecipeAuthor] = useState(false);

  useEffect(() => {
    const unsubscribeFromGetRecipe = context.GetRecipe(recipeId);
    const unsubscribeFromGetRecipeReviews = context.GetRecipeReviews(recipeId);
    const unsubscribeFromGetRecipeIngredients = context.GetRecipeIngredients(recipeId);
    return () => {
      unsubscribeFromGetRecipe && unsubscribeFromGetRecipe();
      unsubscribeFromGetRecipeReviews && unsubscribeFromGetRecipeReviews();
      unsubscribeFromGetRecipeIngredients && unsubscribeFromGetRecipeIngredients();
    }
  }, [])  

  useEffect(() => {
    const loggedInUserId = _.get(context, "loggedUser.id");
    const authorId = _.get(context, "selectedRecipe.authorId");
    setIsRecipeAuthor((loggedInUserId&&authorId)? loggedInUserId===authorId : false);
  }, [context.loggedUser, context.selectedRecipe])  

  const ratingChanged = (newRating) => {
		setNewReviewRating(newRating)
  };
	const createReview = () => {
    if (isAnyEmpty(newReviewText) || newRecipeRating===null) {
      setIsReviewTextMissing(true);
      return;
    }
    setIsReviewTextMissing(false);
    if (!context.isLoggedIn && context.isLoggedIn!==null) {
      context.TriggerNotification("warning", "You must Login in order to create a Review");
      return;
    }
    const { avatar, name:username, id:userId } = (context.loggedUser || {});
    // Create recipe review
		const newRecipeReview = {
      text: newReviewText,
      rating: newRecipeRating,
      authorName: username,
      authorAvatar: avatar,
      authorId: userId,
    }
    context.CreateRecipeReview(recipeId, newRecipeReview);
    setNewReviewText("");
    setNewReviewRating(null);
  }
  const toggleRecipeDetailsView = () => {
    setIsViewingIngredients(!isViewingIngredients);
  }
    
  return (
    <RecipeView>
			<RecipeMainInformation>
				{!_.get(image, "url") && <div style={{ height:300, width:"100%" }}></div>}
        {_.get(image, "url") && <RecipeImage src={_.get(image, "url")} alt="Recipe Image"/>}
				<RecipeName> {recipeName} </RecipeName>
				<RecipeDescription> {description} </RecipeDescription>
        <div style={{ alignSelf:"flex-end",display:"flex",justifyContent:"flex-start",alignItems:"center" }}>
          <div style={{ background:"white", padding:"4px", borderRadius:5 }}>
            <StarRatings
              starDimension="22px"
              starSpacing="2px"
              rating={avg_rating}
              starRatedColor={window.colors["app__rateStarColor"]}
              numberOfStars={5}
              name='rating'
            />          
            <span style={{ marginLeft:5,fontSize:16 }}> {`(${total_reviews || 0})`} </span>
          </div>
        </div>
					<RecipeAuthorData>
							<span style={{ marginRight:20, fontWeight:800 }}>Author: </span>
							<RecipeAuthorAvatar src={authorAvatar} alt="Author Avatar"/>
							<RecipeAuthorUsername> {authorName} </RecipeAuthorUsername>
					</RecipeAuthorData>
					<RecipeDate>
							<span style={{ marginRight:20, fontWeight:800 }}>Created At: </span>
							<RecipeAuthorUsername> 
                {moment(convertTimestampToDate(createdAt)).format('MMMM Do YYYY, h:mm a')}
              </RecipeAuthorUsername>
					</RecipeDate>
          {isRecipeAuthor && <ButtonsContainer>
            <Button 
              type="warning"
              onClick={() => history.push(`/recipe/${recipeId}/edit`)}
              text="Edit"		
            />            
            <Button 
              type="danger"
              onClick={() => {
                context.ToggleModal({
                  title: "Do you want to delete this Recipe?",
                  content: <ModalConfirm 
                      onYesLabel="Delete Recipe"
                      onYesFunction={() => {
                          context.ToggleModal();
                          context.DeleteRecipe(recipeId)
                            .then(() => {
                              context.TriggerNotification("success", "Succesfully deleted the recipe");
                              history.push(DISCOVER__ROUTE_PATH);
                            })
                            .catch(() => {
                              context.TriggerNotification("error", "Could not delete the recipe");
                            })                    
                      }}
                  />
              })}}
              text="Delete"			
              style={{ marginLeft:15, marginRight:20 }}
            />            
          </ButtonsContainer>}       
			</RecipeMainInformation>
      
      <RecipeDetails>
        <RecipeIngredients
          onClick={() => { !isViewingIngredients && toggleRecipeDetailsView() }}
          isViewing={isViewingIngredients}
        >
          <TitleLabel> Ingredients </TitleLabel>
          {_.map(context.selectedRecipeIngredients, (ingredient) => {
            const { name, quantity, id } = ingredient;
            return(
              <IngredientData key={id}>
                <IngredientName>{name}</IngredientName>
                :
                <IngredientQuantity>{quantity}</IngredientQuantity>
              </IngredientData>
            )
          })}
        </RecipeIngredients>
        <RecipeSteps
          onClick={() => { isViewingIngredients && toggleRecipeDetailsView() }}
          isViewing={!isViewingIngredients}
        >
          <TitleLabel> Steps </TitleLabel>
          {_.map(steps, (step, i) => <Step key={i}> {step} </Step> )}
        </RecipeSteps>
      </RecipeDetails>

			<RecipeReviews>
        <ReviewStickyContainer>
          <Input 
              label="Rate the Recipe:"
              placeholder="Review"
              onChange={(e) => setNewReviewText(e.target.value)}
              value={newReviewText}
              style={{ background:"white", marginBottom:5 }}
              checkForMissingField={isReviewTextMissing}
          />
          <RatingInput error={isReviewTextMissing && newRecipeRating===null}>
            <StarRatings
              starDimension="22px"
              rating={newRecipeRating || 0}
              starRatedColor={window.colors["app__rateStarColor"]}
              starHoverColor={window.colors["app__rateStarColor"]}
              numberOfStars={5}
              name='rating'
              changeRating={ratingChanged}
            />                
          </RatingInput>
          <Button 
            type="warning"
            onClick={() => createReview()}
            text="Create Review"
            style={{ width:"100%" }}				
          />
        </ReviewStickyContainer>
				{_.map(context.selectedRecipeReviews, (review) => {
          const { id, authorAvatar, authorName:reviewAuthorName } = review;
          const { text, rating, createdAt, authorId } = review;
					return <RecipeReview 
						key={id}
						loggedUserId={_.get(context, "loggedUser.id")}
						authorAvatar={authorAvatar}
						authorName={reviewAuthorName}
						text={text}
						rating={rating}
            createdAt={createdAt}
            reviewId={id}
            reviewAuthorId={authorId}
            recipeId={recipeId}
					/>			
				})}
			</RecipeReviews>
    </RecipeView>
  );
}

export default _RecipeView;

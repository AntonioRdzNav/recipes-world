//==============================================================================
import React, { useContext, useState, useEffect } from "react";
import moment from "moment";
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons'
//==============================================================================
import ModalConfirm from "../../reusable/Modals/ModalConfirm.jsx";
import Input from "../../reusable/Input/index.jsx";
import Button from "../../reusable/Button/index.jsx";

import RecipeContext from "../../../context/recipe-context";

import { isAnyEmpty, convertTimestampToDate } from "../../../utils/Helpers"

import { AVATAR_PLACEHOLDER } from "../../../data/image-urls";

import {
    ReviewContainer,
    ReviewAuthorData,
    ReviewAuthorAvatar,
    ReviewAuthorName,
    ReviewText,    
    ReviewAdditionalData,
    ReviewDate,
    EditIcon,
    CancelIcon,
    RemoveIcon,    
    RatingInput,
} from "./style"
//==============================================================================


function _Review (props) {

    const context = useContext(RecipeContext);  

    const [newRecipeRating, setNewReviewRating] = useState(null);
    const [newReviewText, setNewReviewText] = useState("");
    // UX
    const [isReviewTextMissing, setIsReviewTextMissing] = useState(false);  
    const [isEditingReview, setIsEditingReview] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { loggedUserId, authorAvatar, authorName, text } = props;
    const { rating, createdAt, reviewId, reviewAuthorId, recipeId } = props;

    const createdAtDate = convertTimestampToDate(createdAt);
    const isReviewAuthor = (loggedUserId && reviewAuthorId)? loggedUserId === reviewAuthorId : false;

    useEffect(() => {
      setNewReviewRating(rating);
      setNewReviewText(text);
      return (() => {
        setNewReviewRating(null);
        setNewReviewText("");        
      })
    }, [])

    const ratingChanged = (newRating) => {
      setNewReviewRating(newRating)
    };
    const updateReview = () => {
      if (isAnyEmpty(newReviewText) || newRecipeRating===null) {
        setIsReviewTextMissing(true);
        return;
      }
      setIsReviewTextMissing(false);
      setIsUpdating(true);
      // Update recipe review
      const updatedRecipeReview = {
        text: newReviewText,
        rating: newRecipeRating,
      }
      context.UpdateRecipeReview(recipeId, reviewId, updatedRecipeReview)
        .then(() => {
          setIsEditingReview(false);
          setIsUpdating(false);
          context.TriggerNotification("success", "Review successfully updated");
        })
        .catch(() => {
          setIsEditingReview(false);
          setIsUpdating(false);    
          context.TriggerNotification("error", "Could not update review"); 
        })
    }    

    return (
        <ReviewContainer>
            <ReviewAuthorData>
              <ReviewAuthorAvatar src={authorAvatar || AVATAR_PLACEHOLDER} alt="Review Author Avatar"/>
              <ReviewAuthorName> {authorName} </ReviewAuthorName>
            </ReviewAuthorData>
            {!isEditingReview && <ReviewText> {text} </ReviewText>}
            {!isEditingReview && <ReviewAdditionalData>
              <ReviewDate> {moment(createdAtDate).format('MMMM Do YYYY, h:mm a')} </ReviewDate>
              <StarRatings
                starDimension="15px"
                starSpacing="0px"
                rating={rating}
                starRatedColor={window.colors["app__rateStarColor"]}
                numberOfStars={5}
                name='rating'
              />        
            </ReviewAdditionalData>}
            {isReviewAuthor && !isEditingReview && <EditIcon onClick={() => {
              setIsEditingReview(!isEditingReview);
            }}>
              <FontAwesomeIcon icon={faEdit} />
            </EditIcon>}
            {isReviewAuthor && !isEditingReview && <RemoveIcon 
              onClick={() => {
                context.ToggleModal({
                  title: "Do you want to delete this Review?",
                  content: <ModalConfirm 
                      onYesLabel="Delete Review"
                      onYesFunction={() => {
                          context.ToggleModal();
                          context.DeleteRecipeReview(recipeId, reviewId)
                            .then(() => {
                              context.TriggerNotification("success", "Succesfully deleted the review");
                            })
                            .catch(() => {
                              context.TriggerNotification("error", "Could not delete the review");
                            })                    
                      }}
                  />
              })}}            
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </RemoveIcon>}
            {isEditingReview && <CancelIcon onClick={() => setIsEditingReview(!isEditingReview)}>
              <FontAwesomeIcon icon={faTimes} />
            </CancelIcon>}

            {isEditingReview && <Input 
                label="Edit your review text:"
                placeholder="Review"
                onChange={(e) => setNewReviewText(e.target.value)}
                value={newReviewText}
                style={{ background:window.colors["app__lightgray"], marginBottom:5 }}
                checkForMissingField={isReviewTextMissing}
                loading={isUpdating}
            />}
            {isEditingReview && <RatingInput error={isReviewTextMissing && newRecipeRating===null}>
              <StarRatings
                starDimension="19px"
                starSpacing="6px"
                rating={newRecipeRating || 0}
                starRatedColor={window.colors["app__rateStarColor"]}
                starHoverColor={window.colors["app__rateStarColor"]}
                numberOfStars={5}
                name='rating'
                changeRating={ratingChanged}
              />                
            </RatingInput>}
            {isEditingReview && <Button 
              type="warning"
              onClick={() => updateReview()}
              text="Update Review"
              style={{ width:"100%" }}				
            />}            

        </ReviewContainer>        
    )
}

export default _Review;
//==============================================================================
import React from "react";
import moment from "moment";
import StarRatings from 'react-star-ratings';
//==============================================================================
import {
    ReviewContainer,
    ReviewAuthorData,
    ReviewAuthorAvatar,
    ReviewAuthorName,
    ReviewText,    
    ReviewAdditionalData,
    ReviewDate,
} from "./style"

import { convertTimestampToDate } from "../../../utils/Helpers";
//==============================================================================


function _Review (props) {

    const { authorAvatar, authorName, text, rating, createdAt } = props;

    const createdAtDate = convertTimestampToDate(createdAt);

    return (
        <ReviewContainer>
            <ReviewAuthorData>
                <ReviewAuthorAvatar src={authorAvatar} alt="Review Author Avatar"/>
                <ReviewAuthorName> {authorName} </ReviewAuthorName>
            </ReviewAuthorData>
            <ReviewText> {text} </ReviewText>
            <ReviewAdditionalData>
              <ReviewDate> {moment(createdAtDate).format('MMMM Do YYYY, h:mm a')} </ReviewDate>
              <StarRatings
                starDimension="17px"
                starSpacing="0px"
                rating={rating}
                starRatedColor={window.colors["app__rateStarColor"]}
                numberOfStars={5}
                name='rating'
              />        
            </ReviewAdditionalData>
        </ReviewContainer>        
    )
}

export default _Review;
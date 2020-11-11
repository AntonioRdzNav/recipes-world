//==============================================================================
import React from "react";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
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
              <ReactStars
                count={5}
                value={rating}
                isHalf={true}
                edit={false}
                size={20}
                activeColor={window.colors["app__rateStarColor"]}
              />         
            </ReviewAdditionalData>
        </ReviewContainer>        
    )
}

export default _Review;
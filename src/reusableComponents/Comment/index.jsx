//==============================================================================
import React from "react";
//==============================================================================
import {
    CommentContainer,
    CommentAuthorData,
    CommentAuthorAvatar,
    CommentAuthorName,
    CommentText,    
} from "./style"
//==============================================================================


function _Comment (props) {

    const { authorAvatar, authorName, commentText } = props;

    return (
        <CommentContainer>
            <CommentAuthorData>
                <CommentAuthorAvatar src={authorAvatar} alt="Comment Author Avatar"/>
                <CommentAuthorName> {authorName} </CommentAuthorName>
            </CommentAuthorData>
            <CommentText> {commentText} </CommentText>
        </CommentContainer>        
    )
}

export default _Comment;
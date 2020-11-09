//==============================================================================
import React, { useState } from "react";
import _ from "lodash";
import ReactStars from "react-rating-stars-component";
//==============================================================================
import RecipeComment from "../../reusable/Comment/index.jsx"
import Input from "../../reusable/Input/index"
import Button from "../../reusable/Button/index"

import {
	RecipeView,
	RecipeMainInformation,
	RecipeImage,
	RecipeName,
	RecipeDescription,
	RecipeSteps,
    RecipeAuthorData,
    RecipeAuthorAvatar,
    RecipeAuthorUsername,
	Step,
    RecipeComments,
} from "./style"
//==============================================================================

let recipeComments = [
	{
		id: "12",
		authorAvatar: "https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI",
		authorName: "Antonio Rodriguez",
		commentText: "Really tasty, but I would say that the chilli used may be wrong.",
	},
	{
		id: "2",
		authorAvatar: "https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI",
		authorName: "Antonio Rodriguez",
		commentText: "Really tasty, but I would say that the chilli used may be wrong.",
	},
	{
		id: "23",
		authorAvatar: "https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI",
		authorName: "Antonio Rodriguez",
		commentText: "Really tasty, but I would say that the chilli used may be wrong.",
	}
];

function _RecipeView() {

	const [recipeRating, setRecipeRating] = useState(0);
	const [newComment, setNewComment] = useState("");

  const ratingChanged = (newRating) => {
		setRecipeRating(newRating)
  };
	const createComment = () => {
		// recipeComments.push({
		// 	id: "4",
		// 	authorAvatar: "https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI",
		// 	authorName: "Antonio Rodriguez",
		// 	commentText: newComment,
		// })
		setNewComment("")
	}
    
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
					<RecipeAuthorData>
							<span style={{ marginRight:20, fontWeight:800 }}>Author: </span>
							<RecipeAuthorAvatar src="https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI" alt="Author Avatar"/>
							<RecipeAuthorUsername> Antonio Rodriguez </RecipeAuthorUsername>
					</RecipeAuthorData>
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
				<Input 
						label="Write a new comment..."
						placeholder="Comment"
						onChange={(e) => setNewComment(e.target.value)}
						value={newComment}
						style={{ background:"white", marginBottom:5 }}
				/>
				<Button 
					type="warning"
					onClick={() => createComment()}
					text="Create Comment"
					style={{ width:"100%", marginBottom:30 }}				
				/>

				{_.map(recipeComments, (comment) => {
					const { id, authorAvatar, authorName, commentText } = comment;
					return <RecipeComment 
						key={id}
						authorAvatar={authorAvatar}
						authorName={authorName}
						commentText={commentText}
					/>			
				})}
			</RecipeComments>
    </RecipeView>
  );
}

export default _RecipeView;

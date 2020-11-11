import React from "react";

export default React.createContext({
    isLoggedIn: false,
    loggedUser: null,
    selectedUser: null,
    recipes: [],
    selectedRecipe: null,
    selectedRecipeReviews: [],
    selectedRecipeIngredients: [],
});
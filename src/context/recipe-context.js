import React from "react";

export default React.createContext({
  // System state
    modalParameters: { isOpened: false },
  // Recipe state
    isLoggedIn: null,
    loggedUser: null,
    selectedUser: null,
    recipes: [],
    selectedRecipe: null,
    selectedRecipeReviews: [],
    selectedRecipeIngredients: [],
});
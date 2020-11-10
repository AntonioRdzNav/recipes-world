import React from "react";

export default React.createContext({
    loggedUser: null,
    user: null,
    recipes: [],
    selectedRecipe: null,
    selectedRecipeComments: [],
    selectedRecipeSteps: [],
});
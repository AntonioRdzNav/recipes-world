//==============================================================================
import {
    // Account actions
    USER_IS_LOGGEDIN,
    GET_USER,
    GET_LOGGED_USER,
    LOGOUT,
    // Recipes actions
    GET_ALL_RECIPES,
    GET_RECIPE,
} from "./actions"
//==============================================================================


//////////////////////////////////////////////////////////////
//                   Account Methods
//////////////////////////////////////////////////////////////
const UserIsLoggedIn = (payload, state) => {
    const { isLoggedIn } = payload;
    return { ...state, isLoggedIn };    
}
const GetLoggedUser = (payload, state) => {
    const { loggedUser } = payload;
    return { ...state, loggedUser };    
}
const GetUser = (payload, state) => {
    const { selectedUser } = payload;
    return { ...state, selectedUser };    
}
const Logout = (payload, state) => {
    return { ...state, loggedUser: null };
}
//////////////////////////////////////////////////////////////
//                   Recipes Methods
//////////////////////////////////////////////////////////////
const GetAllRecipes = (payload, state) => {
    const { recipes } = payload;
    return { ...state, recipes };
}
const GetRecipe = (payload, state) => {
    const { selectedRecipe } = payload;
    return { ...state, selectedRecipe };
}

//////////////////////////////////////////////////////////////
//                    REDUCER DEFINITION
//////////////////////////////////////////////////////////////
export const recipeReducer = (state, action) => {
    switch (action.type) {
        // Account Actions
        case USER_IS_LOGGEDIN:
            return UserIsLoggedIn(action.payload, state);
        case GET_LOGGED_USER:
            return GetLoggedUser(action.payload, state);
        case GET_USER:
            return GetUser(action.payload, state);
        case LOGOUT:
            return Logout(action.payload, state);
        // Recipes Actions
        case GET_ALL_RECIPES:
            return GetAllRecipes(action.payload, state);
        case GET_RECIPE:
            return GetRecipe(action.payload, state);
        // Default
        default:
            return state;
    }
};
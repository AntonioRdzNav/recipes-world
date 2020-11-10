//==============================================================================
import {
    USER_IS_LOGGEDIN,
    GET_USER,
    GET_LOGGED_USER,
    LOGOUT,
} from "./actions"
//==============================================================================


//////////////////////////////////////////////////////////////
//                   Account Methods
//////////////////////////////////////////////////////////////
const userIsLoggedIn = (payload, state) => {
    const { isLoggedIn } = payload;
    return { ...state, isLoggedIn };    
}
const getLoggedUser = (payload, state) => {
    const { loggedUser } = payload;
    return { ...state, loggedUser };    
}
const getUser = (payload, state) => {
    const { selectedUser } = payload;
    return { ...state, selectedUser };    
}
const logout = (payload, state) => {
    return { ...state, loggedUser: null };
}
//////////////////////////////////////////////////////////////
//                   Recipes Methods
//////////////////////////////////////////////////////////////
// const createRecipe = () => {

// }


//////////////////////////////////////////////////////////////
//                    REDUCER DEFINITION
//////////////////////////////////////////////////////////////
export const recipeReducer = (state, action) => {
    switch (action.type) {
        case USER_IS_LOGGEDIN:
            return userIsLoggedIn(action.payload, state);
        case GET_LOGGED_USER:
            return getLoggedUser(action.payload, state);
        case GET_USER:
            return getUser(action.payload, state);
        case LOGOUT:
            return logout(action.payload, state);
        default:
            return state;
    }
};
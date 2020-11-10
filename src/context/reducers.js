//==============================================================================
import {
    LOGIN,
    SIGNUP,
    LOGOUT,
    GET_LOGGED_USER,
} from "./actions"
//==============================================================================


//////////////////////////////////////////////////////////////
//                   Account Methods
//////////////////////////////////////////////////////////////
const getLoggedUser = (payload, state) => {
    const { loggedUser } = payload;
    return { ...state, loggedUser };    
}
const login = (payload, state) => {
    const { loggedUser } = payload;
    return { ...state, loggedUser };
}
const signup = (payload, state) => {
    const { loggedUser } = payload;
    return { ...state, loggedUser };
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
        case GET_LOGGED_USER:
            return getLoggedUser(action.payload, state);
        case LOGIN: 
            return login(action.payload, state);
        case SIGNUP:
            return signup(action.payload, state);
        case LOGOUT:
            return logout(action.payload, state);
        default:
            return state;
    }
};
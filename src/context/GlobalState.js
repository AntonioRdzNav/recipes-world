//==============================================================================
import React, { useReducer, useEffect } from "react";
import _ from "lodash";
// API context
import RecipesContext from "./recipe-context";
import { recipeReducer } from "./reducers"; 
import { 
    LOGIN, 
    SIGNUP,
    LOGOUT,
    GET_LOGGED_USER,
} from "./actions"; 

//==============================================================================
// Firebase
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBmC7VKtY9myD_AwKRyWVrcaa60smoUm8o",
  authDomain: "recipes-world-1234-training.firebaseapp.com",
  databaseURL: "https://recipes-world-1234-training.firebaseio.com",
  projectId: "recipes-world-1234-training",
  storageBucket: "recipes-world-1234-training.appspot.com",
  messagingSenderId: "1074266359038",
  appId: "1:1074266359038:web:5472c8d5bd9d332292d1af"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()
const firestore = firebase.firestore()

if(window.location.hostname === 'localhost') {
	firestore.useEmulator("localhost", 8080)
	auth.useEmulator("http://localhost:9099/")
}
//==============================================================================


function GlobalState (props) {
    
//////////////////////////////////////////////////////////////
//                       GlobalState
//////////////////////////////////////////////////////////////
    const [globalState, dispatcher] = useReducer(recipeReducer, {
        loggedUser: null,
        user: null,
        recipes: [],
        selectedRecipe: null,
        selectedRecipeComments: [],
        selectedRecipeSteps: [],        
    }); 

//////////////////////////////////////////////////////////////
//                     AUTH HOOKS
//////////////////////////////////////////////////////////////
    const [user, loading, error] = useAuthState(auth);

    useEffect(() => {
        dispatcher({ type: GET_LOGGED_USER, payload: { loggedUser: user } })
    }, [user])       

//////////////////////////////////////////////////////////////
//                    ACCOUNT ACTIONS
//////////////////////////////////////////////////////////////
    const login = (email, password) => { 
        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                console.log("dev: dispatcher: login", result)
                dispatcher({ type: LOGIN, payload: {
                    loggedUser: _.get(result, "user"),
                }});
            })
            .catch(console.log);               
    }
    // const createUser = (userId, username) => {

    // }
    const signup = (name, email, password) => {
        // return new Promise((resolve, reject) => {
        //     auth.createUserWithEmailAndPassword(email, password)
        //         .then(result => {
        //             const createdUser = _.get(result, "user");
        //         })
        //         .catch(reject);                  
        // });
        // dispatcher({ type: SIGNUP, payload });     
    }
    const logout = () => {
        auth.signOut()
            .then(() => {
                dispatcher({ type: LOGOUT, payload: null });
            })
            .catch(console.log);        
    } 

//////////////////////////////////////////////////////////////
//                       PROVIDER
//////////////////////////////////////////////////////////////
    return <RecipesContext.Provider
        value={{
            // state
            loggedUser: globalState.loggedUser,
            user: globalState.user,
            recipes: globalState.recipes,
            selectedRecipe: globalState.selectedRecipe,
            selectedRecipeComments: globalState.selectedRecipeComments,
            selectedRecipeSteps: globalState.selectedRecipeSteps,
            // auth methods
            login,
            signup,
            logout,
        }}
    >
        {props.children}
    </RecipesContext.Provider>
}

export default GlobalState;
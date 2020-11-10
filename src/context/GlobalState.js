//==============================================================================
import React, { useReducer, useEffect } from "react";
import _ from "lodash";
// API context
import RecipesContext from "./recipe-context";
import { recipeReducer } from "./reducers"; 
import { 
    USER_IS_LOGGEDIN,
    GET_LOGGED_USER,
    GET_USER,
    LOGOUT,
} from "./actions"; 

//==============================================================================
// Firebase
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

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

    let unsubscribeMethodForLoggedUser = null;    
    
//////////////////////////////////////////////////////////////
//                       GlobalState
//////////////////////////////////////////////////////////////
    const [globalState, dispatcher] = useReducer(recipeReducer, {
        isLoggedIn: false,
        loggedUser: null,
        selectedUser: null,
        recipes: [],
        selectedRecipe: null,
        selectedRecipeComments: [],
        selectedRecipeSteps: [],        
    });  
//////////////////////////////////////////////////////////////
//                      HOOKS
//////////////////////////////////////////////////////////////
    const [loggedUser, loadingLoggedUser, errorLoggedUser] = useAuthState(auth);

//////////////////////////////////////////////////////////////
//                    ACCOUNT ACTIONS
//////////////////////////////////////////////////////////////
    const GetUser = (userId, options) => {
        return firestore
            .collection("users")
            .doc(userId)
            .onSnapshot(doc => {
                const user = { ...doc.data(), id:doc.uid };
                if(_.get(options, "isGettingLoggedUser")) {
                    dispatcher({ type: GET_LOGGED_USER, payload: { loggedUser: user }});            
                } else {
                    dispatcher({ type: GET_USER, payload: { selectedUser: user }});
                }
            })            
    }
    const CreateUser = (userId, username, email) => {
        const newUser = {
            name: username,
            email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            avatar: "/images/user-placeholder.jpg",
        }
        firestore
            .collection("users")
            .doc(userId)
            .set(newUser)
            .then()
            .catch(console.log)
    }
    const Login = (email, password) => { 
        auth.signInWithEmailAndPassword(email, password)
            .then(console.log)
            .catch(console.log);               
    }
    const Signup = (name, email, password) => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const createdUserId = _.get(result, "user.uid");
                CreateUser(createdUserId, name, email);
            })
            .catch(console.log);                  
    }
    const Logout = () => {
        auth.signOut()
            .then(() => dispatcher({ type: LOGOUT, payload: null }))
            .catch(console.log);        
    } 

//////////////////////////////////////////////////////////////
//                       EFFECTS
//////////////////////////////////////////////////////////////
    useEffect(() => {
        dispatcher({ type: USER_IS_LOGGEDIN, payload: { isLoggedIn: (loggedUser!==null) } });
        if(loggedUser) {
            console.log("dev: getting logged user", loggedUser)
            unsubscribeMethodForLoggedUser = GetUser(loggedUser.uid, { isGettingLoggedUser: true });
        }
    }, [loggedUser])    

    useEffect(() => {
        unsubscribeMethodForLoggedUser && unsubscribeMethodForLoggedUser()
    }, [])      

//////////////////////////////////////////////////////////////
//                       PROVIDER
//////////////////////////////////////////////////////////////
    return <RecipesContext.Provider
        value={{
            // state
            isLoggedIn: globalState.isLoggedIn,
            loggedUser: globalState.loggedUser,
            selectedUser: globalState.selectedUser,
            recipes: globalState.recipes,
            selectedRecipe: globalState.selectedRecipe,
            selectedRecipeComments: globalState.selectedRecipeComments,
            selectedRecipeSteps: globalState.selectedRecipeSteps,
            // auth methods
            GetUser,
            Login,
            Signup,
            Logout,
        }}
    >
        {props.children}
    </RecipesContext.Provider>
}

export default GlobalState;
//==============================================================================
import React, { useReducer, useEffect } from "react";
import _ from "lodash";
// API context
import RecipesContext from "./recipe-context";
import { recipeReducer } from "./reducers"; 
import { 
    // Account actions
    USER_IS_LOGGEDIN,
    GET_LOGGED_USER,
    GET_USER,
    LOGOUT,
    // Recipes actions
    GET_ALL_RECIPES,
    GET_RECIPE,
} from "./actions"; 

import { enrichSnapshotWithId } from "../utils/Helpers"
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
//                       EFFECTS
//////////////////////////////////////////////////////////////
useEffect(() => {
  dispatcher({ type: USER_IS_LOGGEDIN, payload: { isLoggedIn: (loggedUser!==null) } });
  let unsubscribeFromGetUser = null;
  if(loggedUser) {
      unsubscribeFromGetUser = GetUser(loggedUser.uid, { isGettingLoggedUser: true });
  }
  return () => {
    unsubscribeFromGetUser && unsubscribeFromGetUser();
  }
}, [loggedUser])       


//////////////////////////////////////////////////////////////
//                    ACCOUNT ACTIONS
//////////////////////////////////////////////////////////////
  const GetUser = (userId, options) => { 
    // returns suscription (make sure to end it)
    return firestore
        .collection("users")
        .doc(userId)
        .onSnapshot(docSnapshot => {
            const user = { ...docSnapshot.data(), id:docSnapshot.uid };
            if(_.get(options, "isGettingLoggedUser")) {
                dispatcher({ type: GET_LOGGED_USER, payload: { loggedUser: user }});            
            } else {
                dispatcher({ type: GET_USER, payload: { selectedUser: user }});
            }
        })            
  };
  const CreateUser = (userId, username, email) => {
    const newUser = {
        name: username,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        avatar: "/images/user-placeholder.jpg",
    }
    return new Promise((resolve, reject) => {
      return firestore
          .collection("users")
          .doc(userId)
          .set(newUser)
          .then(resolve)
          .catch(reject)
    });
  };
  const Login = (email, password) => { 
    return new Promise((resolve, reject) => {
      return auth.signInWithEmailAndPassword(email, password)
          .then(resolve)
          .catch(reject); 
    });              
  };
  const Signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      auth.createUserWithEmailAndPassword(email, password)
          .then(result => {
              const createdUserId = _.get(result, "user.uid");
              CreateUser(createdUserId, name, email)
                .then(resolve)
                .catch(reject);
          })
          .catch(reject);   
      });               
  };
  const Logout = () => {
    return new Promise((resolve, reject) => {
      auth.signOut()
          .then(() => {
            dispatcher({ type: LOGOUT, payload: null });
            resolve();
          })
          .catch(reject);   
    });     
  };
//////////////////////////////////////////////////////////////
//                    RECIPE ACTIONS
//////////////////////////////////////////////////////////////
  const GetAllRecipes = () => {
    // returns suscription (make sure to end it)
      return firestore
          .collection("recipes")
          .onSnapshot(collectionSnapshot => {
              const recipes = enrichSnapshotWithId(collectionSnapshot);
              dispatcher({ type: GET_ALL_RECIPES, payload: { recipes }});            
          })            
  };
  const CreateRecipe = (newRecipe, newIngredients) => {
    return new Promise((resolve, reject) => {
      return firestore
          .collection("recipes")
          .add({ ...newRecipe, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
          .then((result) => {
            const recipeId = result.id;
            CreateRecipeIngredientsBatch(recipeId, newIngredients)
              .then(() => resolve({ ...newRecipe, id:recipeId }))
              .catch(reject);        
          })
          .catch(reject);
    });
  };
  const GetRecipe = (recipeId) => {
    // returns suscription (make sure to end it)
      return firestore
          .collection("recipes")
          .doc(recipeId)
          .onSnapshot(docSnapshot => {
            const recipe = { ...docSnapshot.data(), id:docSnapshot.uid };
            dispatcher({ type: GET_RECIPE, payload: { selectedRecipe:recipe }});            
          })            
  };  
  const CreateRecipeIngredientsBatch = (recipeId, ingredients) => {
    return new Promise(async (resolve, reject) => {
      const batch = firestore.batch();
      for (const ingredient of ingredients) {
        const ingredientRef = firestore
          .collection("recipes").doc(recipeId)
          .collection("ingredients").doc()
        await batch.set(ingredientRef, ingredient)
      }
      batch.commit()
        .then(resolve)
        .catch(reject);
    });
  };
  // const DeleteRecipeIngredientsBatch = (ingredients) => {
  //   return new Promise(async (resolve, reject) => {
  //     const batch = firestore.batch();
  //     for (const ingredient in ingredients) {
  //       const ingredientRef = firestore.collection("ingredients").doc(ingredient.id)
  //       await batch.delete(ingredientRef)
  //     }
  //     batch.commit()
  //       .then(resolve)
  //       .catch(reject);
  //   });
  // };

//////////////////////////////////////////////////////////////
//                       PROVIDER
//////////////////////////////////////////////////////////////
  return (
    <RecipesContext.Provider
      value={{
        // state
        isLoggedIn: globalState.isLoggedIn,
        loggedUser: globalState.loggedUser,
        selectedUser: globalState.selectedUser,
        recipes: globalState.recipes,
        selectedRecipe: globalState.selectedRecipe,
        selectedRecipeComments: globalState.selectedRecipeComments,
        // account actions
        GetUser,
        Login,
        Signup,
        Logout,
        // recipes actions 
        GetAllRecipes,
        CreateRecipe,
        GetRecipe,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
}

export default GlobalState;
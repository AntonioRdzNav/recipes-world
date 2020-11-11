//==============================================================================
import React, { useReducer, useEffect } from "react";
import _ from "lodash";

// context + reducer
import RecipesContext from "./recipe-context";
import { recipeReducer } from "./reducers"; 
import { 
    // System actions
    TOGGLE_MODAL,
    // Account actions
    USER_IS_LOGGEDIN,
    GET_LOGGED_USER,
    GET_USER,
    LOGOUT,
    // Recipes actions
    GET_ALL_RECIPES,
    GET_RECIPE,
    GET_RECIPE_REVIEWS,
    GET_RECIPE_INGREDIENTS,
} from "./actions"; 

import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';

import { enrichSnapshotWithId, capitalizeFirstLetter } from "../utils/Helpers"
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
      // system state
      modalParameters: { isOpened: false },
      // recipe state
      isLoggedIn: false,
      loggedUser: null,
      selectedUser: null,
      recipes: [],
      selectedRecipe: null,
      selectedRecipeReviews: [],
      selectedRecipeIngredients: [],
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
//                    SYSTEM ACTIONS
//////////////////////////////////////////////////////////////
const TriggerNotification = (type="success", content="", milliseconds) => {
  if(!NotificationManager[type]){
      return;
  }
  const defaultMilliseconds = (type==="success")? 2000 : 5000;
  NotificationManager[type](content, `${capitalizeFirstLetter(type)}!`, milliseconds||defaultMilliseconds);
};
const ToggleModal = (modalParameters) => {
  dispatcher({ type: TOGGLE_MODAL, payload: { modalParameters }});
};

//////////////////////////////////////////////////////////////
//                    ACCOUNT ACTIONS
//////////////////////////////////////////////////////////////
  const GetUser = (userId, options) => { 
    // returns suscription (make sure to end it)
    return firestore
        .collection("users")
        .doc(userId)
        .onSnapshot(docSnapshot => {
            const user = { ...docSnapshot.data(), id:docSnapshot.id };
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
  const GetRecipeReviews = (recipeId) => {
    // returns suscription (make sure to end it)
    return firestore
    .collection("recipes")
    .doc(recipeId)
    .collection("reviews")
    .onSnapshot(collectionSnapshot => {
      const selectedRecipeReviews = enrichSnapshotWithId(collectionSnapshot);
          dispatcher({ type: GET_RECIPE_REVIEWS, payload: { selectedRecipeReviews }});            
        })            
  };    
  const CreateRecipeReview = (recipeId, newRecipeReview) => {
    return new Promise((resolve, reject) => {
      return firestore
      .collection("recipes")
      .doc(recipeId)
      .collection("reviews")
      .add({ ...newRecipeReview, createdAt: firebase.firestore.FieldValue.serverTimestamp() })
      .then((result) => {
        const reviewId = result.id;
        resolve({ ...newRecipeReview, id:reviewId });      
      })
      .catch(reject);
    });
  };
  const GetRecipeIngredients = (recipeId) => {
    // returns suscription (make sure to end it)
    return firestore
    .collection("recipes")
    .doc(recipeId)
    .collection("ingredients")
    .onSnapshot(collectionSnapshot => {
      const selectedRecipeIngredients = enrichSnapshotWithId(collectionSnapshot);
      dispatcher({ type: GET_RECIPE_INGREDIENTS, payload: { selectedRecipeIngredients }});            
    });
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

//////////////////////////////////////////////////////////////
//                       PROVIDER
//////////////////////////////////////////////////////////////
  return (
    <RecipesContext.Provider
      value={{
        // system state
        modalParameters: globalState.modalParameters,
        // recipe state
        isLoggedIn: globalState.isLoggedIn,
        loggedUser: globalState.loggedUser,
        selectedUser: globalState.selectedUser,
        recipes: globalState.recipes,
        selectedRecipe: globalState.selectedRecipe,
        selectedRecipeReviews: globalState.selectedRecipeReviews,
        selectedRecipeIngredients: globalState.selectedRecipeIngredients,
        // system actions
        TriggerNotification,
        ToggleModal,
        // account actions
        GetUser,
        Login,
        Signup,
        Logout,
        // recipes actions 
        GetAllRecipes,
        CreateRecipe,
        GetRecipe,
        GetRecipeReviews,
        CreateRecipeReview,    
        GetRecipeIngredients,    
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
}

export default GlobalState;
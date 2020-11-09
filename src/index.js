//==============================================================================
import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import './index.css';

import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

//==============================================================================

import DefaultLayout from "./components/reusable/DefaultLayout/index.jsx"
// domain
import Discover from "./components/domain/Discover/index.jsx"
import RecipeView from "./components/domain/RecipeView/index.jsx"
import Publish from "./components/domain/Publish/index.jsx"
// account
import Login from "./components/account/Login/index.jsx"
import Signup from "./components/account/Signup/index.jsx"

import { 
    DISCOVER__ROUTE_PATH, 
    RECIPE_VIEW__ROUTE_PATH,
    PUBLISH__ROUTE_PATH,
		LOGIN__ROUTE_PATH,
		SIGNUP__ROUTE_PATH,
} from "./data/urls"

// init [window.colors] global variable
import "./data/main-colors";

//==============================================================================

let firebaseConfig = {
  apiKey: "AIzaSyBmC7VKtY9myD_AwKRyWVrcaa60smoUm8o",
  authDomain: "recipes-world-1234-training.firebaseapp.com",
  databaseURL: "https://recipes-world-1234-training.firebaseio.com",
  projectId: "recipes-world-1234-training",
  storageBucket: "recipes-world-1234-training.appspot.com",
  messagingSenderId: "1074266359038",
  appId: "1:1074266359038:web:5472c8d5bd9d332292d1af"
};

if(window.location.hostname === 'localhost') {
	firebaseConfig = {
		databaseURL: "http://localhost:4000/",
		projectId: "recipes-world-1234-training",
	}
}

firebase.initializeApp(firebaseConfig);

//==============================================================================


function RouteWithLayout({
    component: Component, 
    layout: Layout, 
    ...rest
}) {
    return (
        <Route {...rest} render={(props) => 
            <Layout {...props}>
                <Component {...props} />
            </Layout>
        } />
    );
}

ReactDOM.render(
  <React.StrictMode>

    <Router>            
        <Switch>                 
					{/* Account */}
          <RouteWithLayout exact path={LOGIN__ROUTE_PATH} component={Login} layout={DefaultLayout}/>                                  
          <RouteWithLayout exact path={SIGNUP__ROUTE_PATH} component={Signup} layout={DefaultLayout}/>                                  
					{/* Recipes */}
          <RouteWithLayout exact path={DISCOVER__ROUTE_PATH} component={Discover} layout={DefaultLayout}/>                                  
          <RouteWithLayout exact path={RECIPE_VIEW__ROUTE_PATH} component={RecipeView} layout={DefaultLayout}/>                                  
          <RouteWithLayout exact path={PUBLISH__ROUTE_PATH} component={Publish} layout={DefaultLayout}/>                                  
          <Redirect path="*" to={DISCOVER__ROUTE_PATH} />                   
      </Switch>
    </Router>  

  </React.StrictMode>,
  document.getElementById('root')
);

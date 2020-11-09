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

// import firebase from "firebase/app"
// import "firebase/firestore"
// import "firebase/auth"

// firebase.initializeApp({

// })
//==============================================================================

import DefaultLayout from "./components/DefaultLayout/index.jsx"
import Discover from "./components/Discover/index.jsx"
import Publish from "./components/Publish/index.jsx"

import { DISCOVER_URL, PUBLISH_URL } from "./data/urls"

// init [window.colors] global variable
import "./data/main-colors";
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
          <RouteWithLayout exact path={DISCOVER_URL} component={Discover} layout={DefaultLayout}/>                                  
          <RouteWithLayout exact path={PUBLISH_URL} component={Publish} layout={DefaultLayout}/>                                  
          <Redirect path="*" to={DISCOVER_URL} />                   
      </Switch>
    </Router>  

  </React.StrictMode>,
  document.getElementById('root')
);

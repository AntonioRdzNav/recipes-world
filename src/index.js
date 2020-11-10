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

//==============================================================================

// reusable
import DefaultLayout from "./components/reusable/DefaultLayout/index.jsx";
// domain
import Discover from "./components/domain/Discover/index.jsx";
import RecipeView from "./components/domain/RecipeView/index.jsx";
import Publish from "./components/domain/Publish/index.jsx";
// account
import Login from "./components/account/Login/index.jsx";
import Signup from "./components/account/Signup/index.jsx";

import { 
    DISCOVER__ROUTE_PATH, 
    RECIPE_VIEW__ROUTE_PATH,
    PUBLISH__ROUTE_PATH,
		LOGIN__ROUTE_PATH,
		SIGNUP__ROUTE_PATH,
} from "./data/urls"

// init [window.colors] global variable
import "./data/main-colors";

import GlobalState from "./context/GlobalState"

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

		<GlobalState>
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
		</GlobalState>

  </React.StrictMode>,
	
  document.getElementById('root')
);

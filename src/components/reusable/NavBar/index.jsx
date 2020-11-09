//==============================================================================
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
//==============================================================================
import { 
    NavBar,
    LinksContainer,
    Home,
    NavBarLink,
 } from "./style.js";

import { DISCOVER__ROUTE_PATH, PUBLISH__ROUTE_PATH } from "../../../data/urls"
//==============================================================================

function _NavBar() {

	const match = useRouteMatch();

	const matchedUrl = match.url;

  return (
	<NavBar>
		<LinksContainer>
			
			<Home>
				<Link to="/">
					<i className="fa fa-home"></i>
				</Link>                                                
			</Home>
			
			<NavBarLink activeTab={matchedUrl === DISCOVER__ROUTE_PATH}>
				<Link to={DISCOVER__ROUTE_PATH}>Discover</Link>
			</NavBarLink>
			<NavBarLink activeTab={matchedUrl === PUBLISH__ROUTE_PATH}>
				<Link to={PUBLISH__ROUTE_PATH}>Publish</Link>
			</NavBarLink>

		</LinksContainer>
	</NavBar>	  
  );
}

export default _NavBar;

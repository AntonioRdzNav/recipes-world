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

import { DISCOVER_URL, PUBLISH_URL } from "../../data/urls"
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
			
			<NavBarLink activeTab={matchedUrl === DISCOVER_URL}>
				<Link to={DISCOVER_URL}>Discover</Link>
			</NavBarLink>
			<NavBarLink activeTab={matchedUrl === PUBLISH_URL}>
				<Link to={PUBLISH_URL}>Publish</Link>
			</NavBarLink>

		</LinksContainer>
	</NavBar>	  
  );
}

export default _NavBar;

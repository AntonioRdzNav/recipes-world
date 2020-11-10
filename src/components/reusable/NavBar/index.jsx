//==============================================================================
import React, { useContext } from "react";
import _ from "lodash";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
//==============================================================================
import { 
	NavBar,
	LinksContainer,
	NavBarLink,
	UserData,
	UserAvatar,
	UserName,
 } from "./style.js";

import Button from "../Button/index.jsx"
import ReactMenu from "../ReactMenu/index.jsx"

import RecipeContext from "../../../context/recipe-context"

import { 
	DISCOVER__ROUTE_PATH, 
	PUBLISH__ROUTE_PATH,
	LOGIN__ROUTE_PATH,
	SIGNUP__ROUTE_PATH
} from "../../../data/urls"
//==============================================================================

function _NavBar() {

    const context = useContext(RecipeContext);

    const { isLoggedIn, loggedUser, Logout } = context;

	const match = useRouteMatch();
	const history = useHistory();

	const matchedUrl = match.url;
	const isInAccountUrl = matchedUrl===LOGIN__ROUTE_PATH || matchedUrl===SIGNUP__ROUTE_PATH;

    const userAvatar = _.get(loggedUser, "avatar") || "/images/user-placeholder.jpg";

    const menuOptions = [
        {
            label: "Logout",
            onClick: Logout,
        }
    ]    

  return (
	<NavBar>
		<LinksContainer>
			
			<NavBarLink activeTab={matchedUrl === DISCOVER__ROUTE_PATH}>
				<Link to={DISCOVER__ROUTE_PATH}>Discover</Link>
			</NavBarLink>
			<NavBarLink activeTab={matchedUrl === PUBLISH__ROUTE_PATH}>
				<Link to={PUBLISH__ROUTE_PATH}>Publish</Link>
			</NavBarLink>

		</LinksContainer>

		{!isLoggedIn && !isInAccountUrl && <Button 
			type="white"
			onClick={() => history.push(LOGIN__ROUTE_PATH)}
			text="Login"
			style={{ marginRight:20 }}
		/>}

		{isLoggedIn && <ReactMenu 
			label={
			<UserData>
				<UserAvatar src={userAvatar} alt="User Avatar"/>
				<UserName style={{ color:"white" }}> {_.get(loggedUser, "name")} </UserName>
			</UserData>			
			}
			options={menuOptions}
			widthMenu="230px"
		/>}

	</NavBar>	  
  );
}

export default _NavBar;

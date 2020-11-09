//==============================================================================
import React from "react";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
// import firebase from "firebase/app"
// import "firebase/auth"
// import { useAuthState } from "react-firebase-hooks/auth"
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

import { 
	DISCOVER__ROUTE_PATH, 
	PUBLISH__ROUTE_PATH,
	LOGIN__ROUTE_PATH,
	SIGNUP__ROUTE_PATH
} from "../../../data/urls"
//==============================================================================

// const auth = firebase.auth()

function _NavBar() {

    // const [user] = useAuthState(auth);
	const match = useRouteMatch();
	const history = useHistory();

	const matchedUrl = match.url;
	const isInAccountUrl = matchedUrl===LOGIN__ROUTE_PATH || matchedUrl===SIGNUP__ROUTE_PATH;

	const userAvatar = "https://media-exp1.licdn.com/dms/image/C4E03AQGBLSX5AG4Reg/profile-displayphoto-shrink_200_200/0?e=1606953600&v=beta&t=MRHqRfAg4HMI1_EqdZjP0TneBo2yto0R7TcqlHEtBMI";
	const userName = "Antonio Rodriguez"

	const menuOptions = [
		{
			label: "Logout",
			onClick: ()=>{},
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

		{/* {!user && !isInAccountUrl && <Button 
			type="white"
			onClick={() => history.push(LOGIN__ROUTE_PATH)}
			text="Login"
			style={{ marginRight:20 }}
		/>}

		{user && <ReactMenu 
			label={
			<UserData>
				<UserAvatar src={userAvatar} alt="User Avatar"/>
				<UserName style={{ color:"white" }}> {userName} </UserName>
			</UserData>			
			}
			options={menuOptions}
			widthMenu="230px"
		/>} */}

	</NavBar>	  
  );
}

export default _NavBar;

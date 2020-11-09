//==============================================================================
import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
//==============================================================================
import { DISCOVER_URL, PUBLISH_URL } from "../data/urls"
//==============================================================================

function NavBar() {

	const match = useRouteMatch();

	const matchedUrl = match.url;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className={`nav-item ${matchedUrl===DISCOVER_URL && "active"}`}>
						<Link className="nav-link" to="/">
							Discover
						</Link>  
					</li>
					<li className={`nav-item ${matchedUrl===PUBLISH_URL && "active"}`}>
						<Link className="nav-link" to="/publish">
							Publish
						</Link> 
					</li>
				</ul>
			</div>
    </nav>
  );
}

export default NavBar;

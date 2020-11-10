//==============================================================================
import React from "react";
import { NotificationContainer } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
//==============================================================================
import NavBar from "../NavBar/index.jsx";
//==============================================================================

function _DefaultLayout (props) {

  return (                         
    <>
      <NavBar {...props}/>

      { props.children }

      <NotificationContainer />
    </>
  )
}

export default _DefaultLayout;
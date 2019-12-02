import React from "react";
import { useAuth0 } from "../../authentication/react-auth0-spa";
import { Link } from "react-router-dom";
// import { is } from "@babel/types";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div id='navDiv'>
      {!isAuthenticated && (
        <  button id="login"
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Log in
        </button>
      )}
    
      {isAuthenticated && <button id="login" onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        
          <span className='navLinks'>
              <Link id='navLink' to="/">Home</Link>&nbsp;
              <Link id='navLink' to="/softphone">Softphone</Link>&nbsp;
              <Link id='navLink' to="/softphone/addcontact">Add Contact</Link>&nbsp;
              <Link id='navLink' to="/softphone/contacts">View Contacts</Link>&nbsp;
              <Link id='navLink' to="/notes">Notes</Link>&nbsp;
              {/* <Link to="/profile">Profile</Link> */}
          </span>
      )}
    </div>
  );
};

export default NavBar;

// This component will be responsible for showing the login and logout buttons
// Here the component renders two buttons, for logging in and logging out, depending on whether the user is currently authenticated.
//Notice the use of useAuth0 — provided by the wrapper you created in the previous section — which provides the 
//functions needed in order to log in, log out, and determine if the user is logged in through the isAuthenticated property.
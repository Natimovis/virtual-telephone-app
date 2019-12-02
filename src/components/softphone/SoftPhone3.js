import React, { Fragment } from "react";
import { useAuth0 } from "../../authentication/react-auth0-spa";
import SoftPhone2 from "./SoftPhone2";

const SoftPhone3 = (props) => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Fragment>
      <SoftPhone2 phone_number={
        props.location.state
          ? props.location.state.phone_number
          : null 
        } />
    </Fragment>
  );
};

export default SoftPhone3;
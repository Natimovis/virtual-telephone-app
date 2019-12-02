import React, { Fragment } from "react";
import { useAuth0 } from '../../authentication/react-auth0-spa';


const Profile = () => {
    const { loading, user } = useAuth0();

    if (loading || !user) {
        return (
            <div>Loading...</div>
        )
    }


    return (
        <Fragment>
            {/* <img
                src={user.picture}
                alt="Profile"
            /> */}
            <h2>Full Name: {user.name}</h2>
            <h2>Email: {user.email}</h2>
            <h2>First Name: {user.given_name}</h2>
            <h2>Last Name: {user.family_name}</h2>
            <h2>Nick Name: {user.nickname}</h2>
            <h2>Language: {user.locale}</h2>
            <h2>Last Updated: {user.updated_at}</h2>
            <h2>Email Verification(boolean):{user.email_verified}</h2>
            <h2>AUTHORIZATION ID:{user.sub}</h2>
            {JSON.stringify(user, null, 2)}
        </Fragment>
    );
};

export default Profile;
import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getAllUserProfiles } from "../../modules/userProfileManager";

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    const getUserProfiles = () => {
        getAllUserProfiles().then(userProfiles => {
            setUserProfiles(userProfiles)
        });
    }
    useEffect(() => {
        getUserProfiles();
    }, []);

    if (!userProfiles) {
        return null;
    }

    return (

        <div>{userProfiles.map(user => <UserProfileCard key={user.id} userProfile={user} />)}</div>

    )
}
export default UserProfileList;
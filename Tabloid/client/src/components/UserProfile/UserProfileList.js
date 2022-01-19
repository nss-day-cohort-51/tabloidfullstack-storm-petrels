import React, { useEffect, useState } from "react";
import UserProfileCard from "./UserProfileCard";
import { getAllUserProfile } from "../../modules/userProfileManager";

export const UserProfileList = () => {
    const [userProfile, setUserProfile] = useState([]);

    const getUserProfile = () => {
        getAllUserProfile().then(userProfile => setUserProfile(userProfile));
    }
    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <div>{userProfile.map(user => <UserProfileCard key={user.id} user={user} />)}</div>
        </div>
    )
}
export default UserProfileList;
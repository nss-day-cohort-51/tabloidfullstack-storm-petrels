import React from "react";
import { useEffect, useState } from "react";
import { getUserProfileById } from "../../modules/userProfileManager";
import { useParams } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

export const UserProfileDetails = () => {

    const [userProfile, setUserProfile] = useState([]);
    const { id } = useParams();

    const getUserProfiles = (id) => {
        getUserProfileById(id).then(setUserProfile);
    }

    useEffect(() => {
        getUserProfiles(id);
    }, []);
    console.log(userProfile);
    return (
        <>
            <ListGroup>
                <ListGroupItem>
                    <img src={userProfile.imageLocation} alt="picture" />
                </ListGroupItem>
                <ListGroupItem>
                    <p>Name: {userProfile.fullName}</p>
                    <p>User Name: {userProfile.displayName}</p>
                    <p>Email: {userProfile.email}</p>
                    <p>Created: {userProfile.createDateTime}</p>
                    <p>{userProfile.userType?.name}</p>
                </ListGroupItem>
            </ListGroup>
        </>
    )
}

export default UserProfileDetails;
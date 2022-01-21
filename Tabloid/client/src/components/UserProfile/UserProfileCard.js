import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const UserProfileCard = ({ userProfile }) => {
    return (
        < Card >
            <CardBody>
                <Link to={`/UserProfile/${userProfile.id}`}>
                    <h3>User Name : {userProfile.fullName}</h3>
                </Link>
            </CardBody>
            <CardBody>
                <p>Display Name : {userProfile.displayName}</p>
                <p>Type : {userProfile.userType.name}</p>
            </CardBody>
        </Card >
    )
}
export default UserProfileCard;
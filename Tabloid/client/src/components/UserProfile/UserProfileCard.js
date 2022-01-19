import React from "react";
import Link from "react-router-dom";
import { Card, CardBody } from "reactstrap";

export const UserProfileCard = ({ userProfile }) => {
    return (
        < Card >
            <CardBody>
                <p>User Name : {userProfile.fullName}</p>
                <p>Display Name : {userProfile.displayName}</p>
                <p>Type : {userProfile.userType}</p>
            </CardBody>
        </Card >
    )
}
export default UserProfileCard;
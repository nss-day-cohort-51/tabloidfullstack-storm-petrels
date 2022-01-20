import React from "react";
import { useEffect, useState } from "react";
import { getAllUserProfiles } from "../../modules/userProfileManager";
import { useParams, useHistory } from "react-router-dom";

export const UserProfileDetails = () => {

    const history = useHistory();
    const [userProfile, setUserProfile] = useState([]);
    const { id } = useParams();

    const g
}
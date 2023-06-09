import React, { useContext, useState, useEffect } from 'react'
import { ProfileContext } from '../../contexts/profileContext/ProfileContext';

const Profile = () => {
    const { state, getProfileDetailsAction } = useContext(ProfileContext);

    const [profileDetails, setProfileDetails] = useState({});
    const [laodingSymbol, setLoadingSymbol] = useState(true);

    useEffect(() => {
        getProfileDetailsAction()
            .then((response) => {
                setProfileDetails(response);
            })
            .catch((err) => {
                setProfileDetails(err);
            });
        // console.log(profileDetails);
    }, [getProfileDetailsAction]);

    return (
        <div>
            {Object.entries(profileDetails).map(([key, value]) => (
                <div key={key}>
                    <p>{key}: {value}</p>
                </div>
            ))}
        </div>
    )
}

export default Profile
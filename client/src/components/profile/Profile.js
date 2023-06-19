import React, { useContext, useState, useEffect } from 'react';
import { ProfileContext } from '../../contexts/profileContext/ProfileContext';

const Profile = () => {
    const { getProfileDetailsAction } = useContext(ProfileContext);

    const [profileDetails, setProfileDetails] = useState({});
    const [loadingSymbol, setLoadingSymbol] = useState(true);

    useEffect(() => {
        getProfileDetailsAction()
            .then((response) => {
                setProfileDetails(response);
            })
            .catch((err) => {
                setProfileDetails(err);
            });
    }, [getProfileDetailsAction]);

    return (
        <div>
            {Object.entries(profileDetails).map(([key, value]) => {
                if (typeof value === 'object') {
                    return null; // Skip rendering this key
                }
                return (
                    <div key={key}>
                        <p>{key}: {value}</p>
                    </div>
                );
            })}

        </div>
    );
}

export default Profile;

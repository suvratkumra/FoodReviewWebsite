import React, { useContext, useState, useEffect } from 'react'
import { ProfileContext } from '../../contexts/profileContext/ProfileContext';

const Profile = () => {
    const { getProfileDetailsAction } = useContext(ProfileContext);

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
    }, [profileDetails]);

    return (
        <div>
            {Object.values(profileDetails).map((value, index) => {
                {return (
                    <div key = {index}>
                        <p>{value}</p>

                    </div>
                )}
            })}
        </div>
    )
}

export default Profile
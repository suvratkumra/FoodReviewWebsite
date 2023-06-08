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
    }, [state, profileDetails]);

    return (
        <div>
            {Object.values(profileDetails).map((value, index) => {
                {return (
                    <div>
                        <p>{value}</p>
                        <p>{index}</p>

                    </div>
                )}
            })}
        </div>
    )
}

export default Profile
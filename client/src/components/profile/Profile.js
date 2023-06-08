import React, {useContext, useState, useEffect} from 'react'
import { ProfileContext } from '../../contexts/profileContext/ProfileContext';

const Profile = () => {
    const { state, getProfileDetailsAction} = useContext(ProfileContext);
    useEffect(() => {
        getProfileDetailsAction();
    }, []);
  return (
    <div></div>
  )
}

export default Profile
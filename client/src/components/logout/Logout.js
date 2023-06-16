import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { ProfileContext } from '../../contexts/profileContext/ProfileContext'


const Logout = () => {

  const profileDetails = useContext(ProfileContext);
  const profileState = profileDetails.state;
  const userDetails = useContext(AuthContext);
  const userState = userDetails.state;

  useEffect(() => {
    
    // console.log("logout action triggered")
    profileDetails.deleteAllDetailsAction();

  }, [])

  return (
    <>
    <div>You have been successfully logged out.</div>
    <div>
      profileState: {(Object.values(profileState).length)}
      userState: {(Object.values(userState).length)}
    </div>
    </>
  )
}

export default Logout
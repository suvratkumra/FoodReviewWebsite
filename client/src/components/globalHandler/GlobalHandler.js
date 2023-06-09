// this component is added to App.js which takes care of all the stuff we need for the application in the background, it will be responsible for creating popups, refreshing token (future version) and so on.
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import LogoutPopup from '../logout/LogoutPopup';

const GlobalHandler = () => {
    //1. adding the feature to show popup to the user that they have been successfully signed out.
    const { state, setLogoutBooleanAction } = useContext(AuthContext);
    const [displayLoggedOut, setDisplayLoggedOut] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLogoutBooleanAction(false);
        }, 5000)
        setDisplayLoggedOut(state.loggedOut);
    }, [state.loggedOut])

    return (<>{displayLoggedOut && <LogoutPopup />}</>)
}

export default GlobalHandler
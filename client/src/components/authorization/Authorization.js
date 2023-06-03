import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { Link } from 'react-router-dom'

const Authorization = ({ children }) => {
    // get the token from the state of the authProvider we have.
    const { state } = useContext(AuthContext);
    const [tokenAvailable, setTokenAvailable] = useState(false);
    useEffect(() => {
        setTokenAvailable(state.token !== null);
    }, [state])

    // token boolean
    if (tokenAvailable) {
        return (< div > {children} </div >)
    }

    return (
        <>
            <h1>ERROR, you need to log in first.</h1>
            <Link to="/login"> Login </Link>

            <hr />
            <h1> New user? </h1>
            <Link to="/signup"> register today! </Link>
        </>
    )
}

export default Authorization
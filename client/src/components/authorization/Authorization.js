import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { Link } from 'react-router-dom'

const Authorization = ({ children }) => {
    // get the token from the state of the authProvider we have.
    const { state } = useContext(AuthContext);
    const [tokenAvailable, setTokenAvailable] = useState(false);

    // stuff which needs to be taken care of whenever it is available or every second
    useEffect(() => {
        setTokenAvailable(state.token !== null);
        setTimeout(() => {
            setIsPageReady(true);
        }, 250);   // for 0.25 second.
    }, [state])

    return (
        <div>
            {tokenAvailable ?
                (< div > {children} </div >) :
                (<div>
                    <h1>ERROR, you need to log in first.</h1>
                    <Link to="/login"> Login </Link>
                    <h1> New user? </h1>
                    <Link to="/signup"> register today! </Link>
                    <hr />
                </div>)
            }
        </div>
    )

}

export default Authorization
import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { Link } from 'react-router-dom'

const Authorization = ({ children }) => {
    // get the token from the state of the authProvider we have.
    const { state } = useContext(AuthContext);
    console.log(state);

    // token boolean
    const tokenAvailable = state.token !== null;
    if (tokenAvailable) {
        return (< div > {children} </div >)
    }
    return (
        <>
            <h1>ERROR, you need to log in first.</h1>
            <Link to="/login"> Login </Link>
        </>
    )
}

export default Authorization
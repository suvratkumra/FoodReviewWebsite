import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


const Authorization = ({ children }) => {
    // get the token we have in the local storage
    const token = localStorage.getItem('token');

    const [validToken, setValidToken] = useState(false);

    

    useEffect(() => {
        const config = {
            headers: {
                Authorization: token
            }
        }
        axios.post('http://localhost:3000/v1/user/verify-token', null, config)
            .then((response) => {
                setValidToken(true);
                // console.log(response);
            }).catch((error) => {
                setValidToken(false);
                // console.log(error.response);
            })
    
    }, [])

    const removeLocalStorage = () => {
        localStorage.clear();
    }

    return (
        <div>
            {!validToken ?
                <div>You are not authorized / session expired, You can log in again
                    <Link to="/login">
                        <button onClick={removeLocalStorage}>
                            Login
                        </button>
                    </Link>
                </div>
                : (
                    < div >
                        {children}
                    </div >)}
        </div>
    )
}


export default Authorization
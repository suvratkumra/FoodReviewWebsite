import React, { useState } from 'react'
import axios from 'axios';


const Authorization = ({ children }) => {
    // get the token we have in the local storage
    const token = localStorage.getItem('token');

    const [validToken, setValidToken] = useState(false);

    const config = {
        headers: {
            Authorization: token
        }
    }
    // verify this token with the backend
    axios.post('http://localhost:3000/v1/user/verify-token', null, config)
        .then((response) => {
            setValidToken(true);
            console.log(response);
        }).catch((error) => {
            setValidToken(false);
            console.log(error.response);
        })

    return (
        <div>
            {!validToken ?
                <div>You are not authorized.</div>
                : (< div > {children} </div >)}
        </div>
    )
}


export default Authorization
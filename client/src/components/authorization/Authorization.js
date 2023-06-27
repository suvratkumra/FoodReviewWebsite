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
            {!validToken ? (
                <div className="text-center text-4xl py-8 px-8 mx-8 my-8 flex flex-col justify-between">
                    <div className="text-gray-700 text-3xl m-10 p-10 flex flex-col">
                        <span>
                            You are <span className="font-bold">not authorized or session has expired</span>
                        </span>
                    </div>
                    <Link to="/login" className="flex flex-col">
                        <div className="mb-4 p-2">You can log in again</div>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-gray-500 py-4 px-4 rounded-lg font-semibold w-1/2 self-center my-24"
                            onClick={removeLocalStorage}
                        >
                            <span>Login</span>
                        </button>
                    </Link>

                </div>
            ) : (
                <div>{children}</div>
            )}
        </div>

    )
}


export default Authorization
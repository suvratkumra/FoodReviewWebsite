import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { ProfileContext } from '../../contexts/profileContext/ProfileContext';

const Navbar = () => {
    const [validToken, setValidToken] = useState(false);
    const location = useLocation();
    const { state } = useContext(AuthContext)
    const [isProfileVerified, setIsProfileVerified] = useState(true);

    const navigate = useNavigate();

    var token = localStorage.getItem('token');
    const userId = localStorage.getItem('userid');

    const checkUserVerified = () => {
        const config = {
            params: {
                userid: userId
            }
        }
        axios.get(`http://localhost:3000/v1/user/check-user-verified?userid=${userId}`)
            .then(response => {
                setIsProfileVerified(response?.data?.response[0]?.bProfile_verified);
            })
            .catch(error => {
                // console.log("error", error);
            })
    }

    useEffect(() => {
        token = localStorage.getItem('token');
        if (token) {
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

            // check if the user is verified or not
            checkUserVerified();

        }


    }, [location]);

    const profileDetails = useContext(ProfileContext);
    const profileState = profileDetails.state;

    function handleLogoutAction() {
        // delete everything from localStorage 
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            {/* the banner which tells user to verify their account */}
            {!isProfileVerified && <div>

                Verify Your Account to unlock full features of the website.

                <button onClick={() => { navigate('/verification-page') }}> Verify Now! </button>

            </div>}
            <div className='font-bold bg-gray-200 text-gray-700 p-2 m-0'>
                <ul className='flex flex-row justify-around text-2xl items-center p-3'>
                    <li>
                        <Link className='relative inline-block text-gray-600 hover:text-gray-800 duration-300 transition-all ease-in-out hover:underline ' to="/">Home</Link>

                    </li>
                    <li>
                        <Link className='relative inline-block text-gray-600 hover:text-gray-800 duration-300 transition-all ease-in-out hover:underline ' to="/about">About</Link>
                    </li>
                    {validToken ? (
                        <>
                            <li>
                                <Link to="/profile" className='relative inline-block text-gray-600 hover:text-gray-800 duration-300 transition-all ease-in-out hover:underline '>Profile</Link>
                            </li>
                            <li>
                                <a href='#' className='relative inline-block text-gray-600 hover:text-gray-800 duration-300 transition-all ease-in-out hover:underline ' onClick={handleLogoutAction}>Logout</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className='bg-green-400 rounded-lg p-2 hover:bg-green-500 hover:text-black ease-in-out border-2 border-green-500 hover:border-green-600 hover:cursor-pointer'>
                                <Link to="/login">Login</Link>
                            </li>
                            <li className='bg-orange-400 rounded-lg p-2 hover:bg-orange-500 hover:text-black ease-in-out border-2 border-orange-500 hover:border-orange-600 hover:cursor-pointer'>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div >
    );
};

export default Navbar;

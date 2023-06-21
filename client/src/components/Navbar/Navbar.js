import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { ProfileContext } from '../../contexts/profileContext/ProfileContext';

const Navbar = () => {
    const [validToken, setValidToken] = useState(false);
    const location = useLocation();
    const { state } = useContext(AuthContext)
    const [isProfileVerified, setIsProfileVerified] = useState(true);

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


    }, [location, token, state]);

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
            {!isProfileVerified && <div style={{ fontSize: "2rem", color: "Red", border: "4px black solid", borderRadius: "10px", padding: "10px 20px", display: 'flex', justifyContent: 'space-around' }}>

                Verify Your Account to unlock full features of the website.
                <button> Verify Now! </button>

            </div>}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {validToken ? (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <a href='#' onClick={handleLogoutAction}>Logout</a>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;

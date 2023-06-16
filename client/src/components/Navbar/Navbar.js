import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext/AuthContext';

const Navbar = () => {
    const [userIdFound, setUserIdFound] = useState(false);
    const location = useLocation();
    const {state} = useContext(AuthContext);

    useEffect(() => {
        // Check if the user is authenticated (e.g., by checking the token in localStorage)
        const token = localStorage.getItem('token');
        const isAuthenticated = !!token; // Change this logic based on your authentication mechanism

        setUserIdFound(isAuthenticated);
    }, [location, state.loggedOut]);

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    {userIdFound ? (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
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

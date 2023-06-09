import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { AuthContext, state } from '../../contexts/authContext/AuthContext'

const Navbar = () => {

    const { state } = useContext(AuthContext);
    const [userId, setUserId] = useState(state.userID);
    const [userIdFound, setUserIdFound] = useState(false);

    // console.log(state);

    useEffect(() => {
        setUserId(state.userID);
        if (userId !== null) {
            setUserIdFound(true);
        }
        else
        {
            setUserIdFound(false);
        }
    }, [state, userId, state.userID])

    return (
        <div>

            {
                userIdFound ? (
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>
                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/signup">Sign Up</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </nav>

                )
            }


        </div>
    );
}

export default Navbar;

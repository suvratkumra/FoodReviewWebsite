import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Verification from '../verify/Verification';

const Signup = () => {
    const { registerUserAction, state } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState("");
    const [backendError, setBackendError] = useState("");

    useEffect(() => {
        if (state.createProfileCompleted) {
            navigate("/verification-page");
        }
    }, [state.createProfileCompleted, navigate, state]);

    const handleValueChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.id]: e.target.value,
        }));
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        if (formData.email === "" || formData.password === "") {
            alert("Provide all fields please");
            return;
        }

        registerUserAction(formData)
            .then()
            .catch((error) => {
                setBackendError(error?.response?.data?.response[0]?.reason);
            });
    };

    return (
        <div className="container mx-auto">
            <div className="text-3xl font-bold text-gray-600 p-5">Signup</div>
            <form onSubmit={handleSignupSubmit} className='flex flex-col'>
                <p className="text-red-500">{emailError}</p>
                <input
                    className="border border-gray-300 rounded-lg p-5 m-2"
                    type="email"
                    required
                    name="email"
                    id="email"
                    placeholder="john.doe@gmail.com"
                    value={formData.email}
                    onChange={handleValueChange}
                    onBlur={validateEmail}
                />
                <input
                    className="border border-gray-300 rounded-lg p-5 m-2"
                    type="text"
                    required
                    name="username"
                    id="username"
                    placeholder="John.Doe"
                    value={formData.username}
                    onChange={handleValueChange}
                />
                <input
                    className="border border-gray-300 rounded-lg p-5 m-2"
                    type="password"
                    required
                    name="password"
                    id="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleValueChange}
                />
                <button
                    className="bg-green-500 hover:bg-green-600 text-white p-3 m-2 rounded"
                    type="submit"
                >
                    Sign Up!
                </button>
                <div style={{ margin: "10px 0px" }}>
                    <span style={{ color: "red" }}>{backendError}</span>
                </div>
            </form>
        </div>
    );
}

export default Signup;

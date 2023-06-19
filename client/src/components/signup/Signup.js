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
    })

    const navigate = useNavigate();

    const [emailError, setEmailError] = useState("");
    const [backendError, setBackendError] = useState("");

    useEffect(() => {
        if (state.createProfileCompleted) {
            // redirect to the login page.
            // navigate("/");
            navigate("/verification-page")
        }
        //console.log(state);
    }, [state.createProfileCompleted, navigate, state])

    const handleValueChange = (e) => {
        // change the fields

        // form the key value pair we have
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.id]: e.target.value,
        }));

    }


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
                setBackendError(error?.response?.data?.response[0]?.reason)
            });
    }
    return (
        <>
            <div>Signup</div>
            <form onSubmit={handleSignupSubmit}>
                <p style={{ color: "red" }}> {emailError} </p>
                <input type='email' required name='email' id='email' placeholder='john.doe@gmail.com' value={formData.email} onChange={handleValueChange} onBlur={validateEmail} />
                <input type='username' required name='username' id='username' placeholder='John.Doe' value={formData.username} onChange={handleValueChange} />
                <input type='password' required name='password' id='password' placeholder='password' value={formData.password} onChange={handleValueChange} />
                <button type="submit"> Sign Up! </button>
                <div style={{ margin: "10px 0px" }}>
                    <span style={{ color: "red" }}>{backendError}</span>
                </div>
            </form>


        </>
    )
}

export default Signup
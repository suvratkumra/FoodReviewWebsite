import React, { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext/AuthContext';

const Login = () => {
    const { loginUserAction, state } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [emailError, setEmailError] = useState("");
    // console.log(add(1, 2))

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email === "" || formData.password === "") {
            alert("Provide all fields please");
            return;
        }
        loginUserAction(formData);
    }

    const handleChangeFields = (e) => {
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

    return (
        <div>
            Login
            <form onSubmit={handleSubmit}>
                <p style={{ color: "red" }}> {emailError} </p>
                <input type="email" id="email" name="email" placeholder='john.doe@gmail.com' value={formData.email} onChange={handleChangeFields} onBlur={validateEmail} />
                <input type="password" id="password" name="password" placeholder='password' value={formData.password} onChange={handleChangeFields} />
                <button type='submit'> Log In! </button>
            </form>
        </div>
    )
}

export default Login
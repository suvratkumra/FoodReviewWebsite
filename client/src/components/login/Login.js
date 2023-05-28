import React, { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/AuthenticationContext'
import axios from 'axios';

const Login = () => {
    const { updateJWT, state } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [emailError, setEmailError] = useState("");
    // console.log(add(1, 2))

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.email === "" || formData.password === "") {
            alert("Provide all fields please");
            return;
        }
        try {
            // login
            const response = await axios.post("http://localhost:3000/v1/user/login", formData);
            console.log(state);
            updateJWT(response.data.response[1].token);
        }
        catch (err) {
            console.log(err);
        }
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
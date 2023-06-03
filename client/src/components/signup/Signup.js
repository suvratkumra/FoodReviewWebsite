import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const [emailError, setEmailError] = useState("");

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

        try {
            const response = await axios.post("http://localhost:3000/v1/user/create", formData);
            console.log(response);
            if (response.status === 200) {
                // TODO: redirect to the login page.
                window.location.href = "/login";
            }

        } catch (err) {

        }
        // sending the data to backend and getting the response
    }
    return (
        <>
            <div>Signup</div>
            <form onSubmit={handleSignupSubmit}>
                <p style={{ color: "red" }}> {emailError} </p>
                <input type='email' name='email' id='email' placeholder='john.doe@gmail.com' value={formData.email} onChange={handleValueChange} onBlur={validateEmail} />
                <input type='password' name='password' id='password' placeholder='password' value={formData.password} onChange={handleValueChange} />
                <button type="submit"> Sign Up! </button>
            </form>


        </>
    )
}

export default Signup
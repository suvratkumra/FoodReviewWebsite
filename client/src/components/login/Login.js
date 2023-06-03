import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import loadingSign from '../../images/loading-sign.png'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUserAction, state } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" })
    const [emailError, setEmailError] = useState("");
    const [loading, setLoadingSign] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [signinButtonClicked, setSigninButtonClicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // check to see if logged in and then redirect to the home page.
        if (state.token !== null) {
            navigate('/');
            // console.log(state);
        }
        else {
            setLoginError(true);
        }
    }, [state.token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoadingSign(true);
        if (formData.email === "" || formData.password === "") {
            alert("Provide all fields please");
            return;
        }
        loginUserAction(formData)
            .then((res) => {
                setLoadingSign(false);
            })
            .catch((err) => {
                setLoadingSign(false);
                setSigninButtonClicked(true);
            });
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
                {loginError && signinButtonClicked && <p style={{ color: "red" }}> Incorrect credentials/try again. </p>}
                <input type="email" id="email" name="email" placeholder='john.doe@gmail.com' value={formData.email} onChange={handleChangeFields} onBlur={validateEmail} />
                <input type="password" id="password" name="password" placeholder='password' value={formData.password} onChange={handleChangeFields} />
                <button type='submit'> Log In! </button>
            </form>
            <div>
                {loading && <img id="loading_signin_img" src={loadingSign} alt="loading sign" />}
            </div>
        </div>
    )
}

export default Login
import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { ProfileContext } from '../../contexts/profileContext/ProfileContext'


const Verification = () => {
    const { getProfileDetailsAction } = useContext(ProfileContext);
    const [ verificationCode, setVerificationCode ] = useState(0);
    const { verifyCodeAction } = useContext(AuthContext);
    const [error, setError] = useState("");
    const payload = getProfileDetailsAction();
    const navigate = useNavigate();

    const handleOnSubnitAction = async (e) => {
        e.preventDefault();

        // TODO: CREATE A BANNER FOR UNVERIFIED USERS SO THAT IT REMINDS THEM TO VERIFY BEFORE THEY CAN ACCESS LISTS.
        verifyCodeAction(verificationCode).then(() => navigate('/', {replace:true})).catch(() => console.log("ERROR!!!!!"));
    }

    return (
        <>
            <form onSubmit={handleOnSubnitAction}>
                {error}
                <label htmlFor='verificationCode'>Verification Code: </label>
                <input type="text" name="verificationCode" id="verificationCode" value={verificationCode} onChange={(e) => {
                    setVerificationCode(e.target.value)
                }} />
                <button type="submit"> Verify Me! </button>

            </form>
        </>
    )
}

export default Verification
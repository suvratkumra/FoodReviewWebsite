import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authContext/AuthContext';
import { ProfileContext } from '../../contexts/profileContext/ProfileContext'


const Verification = () => {
    const { getProfileDetailsAction } = useContext(ProfileContext);
    const [verificationCode, setVerificationCode] = useState(0);
    const { state, setIsUserVerifiedAction, verifyCodeAction, sendAnotherVerificationCodeAction } = useContext(AuthContext);
    const [invalidCodeMessage, setInvalidCodeMessage] = useState("");
    const [anotherCodeButton, setAnotherCodeButton] = useState(true);
    const [verificationEmailSent, setVerificationEmailSent] = useState("");
    const [verificationCodeButtonEnabled, setVerficationCodeButtonEnabled] = useState(true);
    const payload = getProfileDetailsAction();
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setVerficationCodeButtonEnabled(false);
            setVerificationEmailSent("")
        }, 5000)

    }, [verificationCodeButtonEnabled])


    const handleOnSubmitAction = async (e) => {
        e.preventDefault();

        verifyCodeAction(verificationCode)
            .then(() => {
                setIsUserVerifiedAction(true)
                // this is called when the verification code is correct. 
                navigate('/', { replace: true })

            })
            .catch(() => {
                // this is called when the verification code is incorrect. 
                setInvalidCodeMessage("Invalid/Expired Code");

            });
    }

    const handleSendingVerificationLinkAgain = (e) => {
        // console.log("verificationLink");
        const bVerificationEmailSent = sendAnotherVerificationCodeAction();
        if (bVerificationEmailSent) {
            setVerificationEmailSent("A new verification link has been sent.")
            setVerficationCodeButtonEnabled(true);
        }
        else {
            setVerificationEmailSent("There was an error sending a verification link, try again later.");
        }
    }

    return (
        <>
            <form onSubmit={handleOnSubmitAction}>
                {invalidCodeMessage}
                <h4>Sent verification link to: <span style={{ color: "blue" }}>{state.email}</span></h4>
                <label htmlFor='verificationCode'>Verification Code: </label>
                <input type="text" name="verificationCode" id="verificationCode" value={verificationCode} onChange={(e) => {
                    setVerificationCode(e.target.value)
                }} />
                <button type="submit"> Verify Me! </button>

            </form>
            {anotherCodeButton && <div>
                <button
                    onClick={handleSendingVerificationLinkAgain}
                    disabled={verificationCodeButtonEnabled}
                >
                    Click here to send Verification code again
                </button>
                <h3> {verificationEmailSent} </h3>
            </div>}

        </>
    )
}

export default Verification
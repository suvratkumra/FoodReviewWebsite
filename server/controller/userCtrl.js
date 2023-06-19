const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const bcrypt = require("bcrypt");
const customResponse = require("../utils/responseTemplate");
const jwt = require('jsonwebtoken');
const authorization = require("../utils/protected");
const createNewToken = require("../utils/createNewToken");
const Profile = require("../model/ProfileModel");
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const loginUserCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find the user with the email 
        const user = await User.findOne({ email });
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (hashedPassword) {
            const token = createNewToken(user);
            // adding the profileid ot the req 
            req.profileId = JSON.stringify(req.profileId);
            // console.log(JSON.stringify(req.profileId));
            customResponse(req, res, 200, "Log in successful", user, { token });
        }
        else {
            customError(req, res, 401, "Invalid Credentials");
        }
    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASS
    }
})

const generateVerficationCode = () => {
    return crypto.randomInt(100000, 999999);
}

const resendVerificationEmailCtrl = async (req, res) => {
    try {
        const userID = req.UserIdExtracted.data;

        // get the user with this userid and extract their email and profileid
        const user = await User.findById(userID);

        const email = user.email;
        const profileId = user.profileId;
        const username = user.username;

        const bVerificationEmailSent = await verificationEmail(email, username, profileId);

        customResponse(req, res, 200, "Approved", { response: "Verification Code sent!." }, { bVerificationEmailSent });

    } catch (error) {
        customError(req, res, 401, "Rejected", { error });

    }
}

const verificationEmail = async (email, username, profileId) => {
    try {
        // generate verification code
        const verificationCode = generateVerficationCode();

        // send the user the verification email based on the email id
        const mailOptions = {
            from: process.env.GMAIL_EMAIL,
            to: email,
            subject: 'Account Verification',
            html: `
          <html>
            <body>
              <p>Hello ${username},</p>
              <p>Thank you for signing up with us.</p>
              <p>Here is the verification code you requested:</p>
              <h2>${verificationCode}</h2>
              <p><strong>Code will expire in 10 minutes</strong></p>
              <p>Thank you,</p>
              <p>Team Foodify</p>
            </body>
          </html>
        `
        };

        await transporter.sendMail(mailOptions);

        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            {
                $set: {
                    'verification.verificationCode': verificationCode,
                    'verification.createdAt': Date.now(),
                    'verification.expiresAt': new Date(Date.now() + 15 * 60 * 1000),
                    'verification.isVerified': false,
                }
            }
        );

        //console.log(updatedProfile);
        return true;
    } catch (error) {
        console.log('Error sending mail:', error);
        return false;
    }
};


const verifyUserCtrl = async (req, res) => {
    try {
        const { verificationCode } = req.body;
        // check if this user entered the correct verification code
        const userID = req.UserIdExtracted.data;

        // find the profile id fo the user
        const user = await User.findById(userID);
        const profileId = user.profileId;

        // find the profile
        const profile = await Profile.findById(profileId);


        // extract the entire object of verification from it
        const verificationObj = profile.verification;

        // console.log("verification obj ", typeof(verificationObj.verificationCode))
        // console.log("verification code passed ", typeof(verificationCode))

        // check if the code is expired:
        if (Date.now() >= verificationObj.expiresAt) {
            customError(req, res, 401, "Rejected", { Reason: "The token has been expired." });
        }

        // check if the code is valid and correct
        if (verificationObj.verificationCode === +verificationCode) {
            // update the profile
            await Profile.findByIdAndUpdate(profileId, {
                $set: {
                    'verification.isVerified': true
                },
            })
            // console.log("verified");
            // you have been verified
            customResponse(req, res, 200, "Approved", { response: "You have been verified." });

        }
        else {
            customResponse(req, res, 400, "Rejected", { response: "Incorrect Code/Expired Code." })
        }

    } catch (e) {
        console.log("this is it");
        customError(req, res, 401, "Rejected", { e });
    }
}


// @brief: 
// User will be created in 2 DB, One is User and One is Profile, both will be made and in future to retrieve the user, we will access the Profile DB. 
const createUserCtrl = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const userAvailable = await User.findOne({ email });

        if (!userAvailable) {
            // hash the password
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const userProfile = await Profile.create({
                email,
                username,
            });

            const profileId = userProfile._id;

            const user = await User.create({
                email,
                username,
                password: hashPassword,
                profileId: profileId,
            });

            const token = createNewToken(user);

            // we will send the verification email to the user and return whether the email was sent successfully or not as a boolean.
            const bVerificationEmailSent = await verificationEmail(email, username, profileId);
            customResponse(req, res, 200, "New user created with profile", user, { token }, { bVerificationEmailSent });
        }
        else {
            customError(req, res, 401, "Rejected", { reason: "User with this email already exists" });
            
        }
        
    }
    catch (err) {
        customError(req, res, err?.code, err?.message);
    }
}



const forgotPasswordCtrl = async (req, res, next) => {
    try {

        const { email, newPassword } = req.body;
        // TODO: add the ability to send a verification link to the email and 
        // then the user is able to change the password.
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOneAndUpdate({
            email
        }, {
            password: hashPassword
        }, { timestamps: true }
        );
        customResponse(req, res, 200, "User Updated", user);
    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }
}

// const logoutCtrl = async (req, res) => {
//     try {
//         // remove all the json web token stored 

//     } catch (error) {

//     }
// }

// @deprecated
// DO NOT USE THIS TO EXTRACT THE ID.
// const userDetailsByIdCtrl = async (req, res) => {
//     try {
//         // extract the id
//         const id = req.params.id;

//         const user = await User.findById(id);
//         customResponse(req, res, 200, "Authorized", user);
//     }
//     catch (err) {
//         customError(req, res, err?.code, err?.message);
//     }
// }

module.exports = { resendVerificationEmailCtrl, loginUserCtrl, verifyUserCtrl, createUserCtrl, forgotPasswordCtrl };
const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const bcrypt = require("bcrypt");
const customResponse = require("../utils/responseTemplate");
const jwt = require('jsonwebtoken');
const authorization = require("../utils/protected");
const createNewToken = require("../utils/createNewToken");
const Profile = require("../model/ProfileModel");

const loginUserCtrl = async (req, res) => {
    try {
        const { email, password } = req.body;
        // find the user with the email 
        const user = await User.findOne({ email });
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (hashedPassword) {
            const token = createNewToken(user);
            customResponse(req, res, 200, "Log in successful", user, { token });
        }
        else
        {
            customError(req, res, 401, "Invalid Credentials");
        }
    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }
};

const createUserCtrl = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        
        const userProfile = await Profile.create({
            email, 
            username
        });

        const profileId = userProfile._id;
        
        //////// TODOOO 
        
        const user = await User.create({
            email,
            username,
            password: hashPassword,
            profileID: profileId
        });

        const token = createNewToken(user);
        customResponse(req, res, 200, "New user created with profile", user, { token }, { userProfile });
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

module.exports = { loginUserCtrl, createUserCtrl, forgotPasswordCtrl };
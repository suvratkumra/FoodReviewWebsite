const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const bcrypt = require("bcrypt");
const customResponse = require("../utils/responseTemplate");
const jwt = require('jsonwebtoken');
const authorization = require("../utils/protected");
const createNewToken = require("../utils/createNewToken");

const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        customError(req, res, 400, "You must add all the fields");
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
        customError(req, res, 401, "Invalid form of credentials")
    }

    // find the user with the email 
    const user = await User.findOne({ email });
    if (user) {
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (hashedPassword) {

            const token = createNewToken(user);
            customResponse(req, res, 200, "Log in successful", user, { token });

        }
        else {
            customError(req, res, 401, "Invalid login credentials");
        }
    }
};

const createUserCtrl = async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !password) {
        customError(req, res, 400, "You must add all the fields");
    }
    else if (typeof email !== 'string' || typeof password !== 'string') {
        customError(req, res, 401, "Invalid form of credentials")
    }

    else {
        // hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            email,
            password: hashPassword
        });

        customResponse(req, res, 200, "New user created", user);
    }
}

const forgotPasswordCtrl = async (req, res, next) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        customError(req, res, 400, "You must add all the fields");
    }
    else if (typeof email !== 'string' || typeof newPassword !== 'string') {
        customError(req, res, 401, "Invalid form of credentials")
    }

    // logic goes here.
    else {
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

    }
}

const userDetailsByIdCtrl = async (req, res) => {
    try {
        // extract the id
        const id = req.params.id;

        const user = await User.findById(id)
        customResponse(req, res, 200, "Authorized", user);

    }
    catch (err) {
        customError(req, res, err?.code, err?.message);
    }

}

module.exports = { loginUserCtrl, createUserCtrl, forgotPasswordCtrl, userDetailsByIdCtrl };
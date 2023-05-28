const { Router } = require("express");
const User = require('../../model/UserModel')
const bcrypt = require("bcrypt");
const customError = require("../../utils/errorTemplate");
const customResponse = require("../../utils/responseTemplate");
const jwt = require('jsonwebtoken');
const authorization = require("../../utils/protected");

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        customError(req, res, 406, "You must add all the fields");
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
        customError(req, res, 403, "Invalid form of credentials")
    }

    // find the user with the email 
    const user = await User.findOne({ email });
    if (user) {
        const hashedPassword = await bcrypt.compare(password, user.password);
        if (hashedPassword) {
            // generate the token for the user.
            const token = "Bearer " + jwt.sign({ data: user._id.toString() },
                process.env.JSONWEBTOKEN_SECRET, { expiresIn: '1h' });

            customResponse(req, res, 200, "Log in successful", user, { token });

        }
        else {
            customError(req, res, 401, "Invalid login credentials");
        }
    }
})


//CREATE
userRouter.post("/create", async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !password) {
        customError(req, res, 406, "You must add all the fields");
    }
    else if (typeof email !== 'string' || typeof password !== 'string') {
        customError(req, res, 403, "Invalid form of credentials")
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
});

// FORGOT PASSWORD
userRouter.post("/login/forgot-password", async (req, res, next) => {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
        customError(req, res, 406, "You must add all the fields");
    }
    else if (typeof email !== 'string' || typeof newPassword !== 'string') {
        customError(req, res, 403, "Invalid form of credentials")
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
})









// -------------------
// TEMP
// -------------------
userRouter.get("/", authorization, async (req, res) => {
    const user = await User.findById(req.UserIdExtracted.data);
    console.log(user);
    customResponse(req, res, 200, "You got access", { "user_details": req.UserIdExtracted });
})

module.exports = userRouter;
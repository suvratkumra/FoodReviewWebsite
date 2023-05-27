const { Router } = require("express");
const protectedCreateList = require("../../utils/protected");
const User = require('../../model/UserModel')
const bcrypt = require("bcrypt");
const customError = require("../../utils/errorTemplate");
const customResponse = require("../../utils/responseTemplate");
const jwt = require('jsonwebtoken')

const userRouter = Router();

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        customError(req, res, 406, "You must add all the fields");
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

userRouter.post("/create", async (req, res) => {
    const { email, username, password } = req.body;
    if (!email || !password) {
        customError(req, res, 406, "You must add all the fields");
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

userRouter.get("/", (req, res) => {
    if (!req.headers.authorization) {
        customError(req, res, 401, "Authorization token missing");
    }
    // spliting the authorization token
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET, (err, success) => {
        if (err) {
            customError(req, res, 403, "Token Invalid/Expired. Please sign in again");
        }
        else {
            customResponse(req, res, 200, "", success);
        }
    });
})

module.exports = userRouter;
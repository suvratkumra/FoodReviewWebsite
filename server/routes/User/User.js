const { Router } = require("express");
const customResponse = require("../../utils/responseTemplate");
const authorization = require("../../utils/protected");
const { loginUserCtrl, createUserCtrl, forgotPasswordCtrl, userDetailsByIdCtrl, verifyUserCtrl } = require("../../controller/userCtrl");

const userRouter = Router();

// LOGIN
userRouter.post("/login", loginUserCtrl)

// CREATE
userRouter.post("/create", createUserCtrl);

// FORGOT PASSWORD
userRouter.post("/login/forgot-password", forgotPasswordCtrl)

userRouter.post('/verify-user', authorization, verifyUserCtrl)

module.exports = userRouter;
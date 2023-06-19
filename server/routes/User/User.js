const { Router } = require("express");
const customResponse = require("../../utils/responseTemplate");
const authorization = require("../../utils/protected");
const { loginUserCtrl, createUserCtrl, forgotPasswordCtrl, userDetailsByIdCtrl, verifyUserCtrl, resendVerificationEmailCtrl } = require("../../controller/userCtrl");

const userRouter = Router();

// LOGIN
userRouter.post("/login", loginUserCtrl)

// CREATE
userRouter.post("/create", createUserCtrl);

// FORGOT PASSWORD
userRouter.post("/login/forgot-password", forgotPasswordCtrl)

userRouter.post('/verify-user', authorization, verifyUserCtrl)

userRouter.post("/resend-verification-email", authorization, resendVerificationEmailCtrl)

module.exports = userRouter;
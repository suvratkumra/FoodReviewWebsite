const { Router } = require("express");
const customResponse = require("../../utils/responseTemplate");
const authorization = require("../../utils/protected");
const { loginUserCtrl, createUserCtrl, forgotPasswordCtrl, userDetailsByIdCtrl, verifyUserCtrl, resendVerificationEmailCtrl } = require("../../controller/userCtrl");
const User = require("../../model/UserModel");
const Profile = require("../../model/ProfileModel");
const customError = require("../../utils/errorTemplate");

const userRouter = Router();

// LOGIN
userRouter.post("/login", loginUserCtrl)

// CREATE
userRouter.post("/create", createUserCtrl);

// FORGOT PASSWORD
userRouter.post("/login/forgot-password", forgotPasswordCtrl)

userRouter.post('/verify-user', authorization, verifyUserCtrl)

userRouter.post("/resend-verification-email", authorization, resendVerificationEmailCtrl)

userRouter.post("/verify-token", authorization, async (req, res) => {
    // if this is being sent that means the user's jsonwebtoken 
    // is correct as Authorization handles it.
    customResponse(req, res, 200, "Approved");
})

userRouter.get("/check-user-verified", async (req, res) => {
    // extract the id from the user.
    const { userid } = req.query;

    try {
        const profileIdObj = await User.findById(userid, { profileId: 1 });
        console.log((profileIdObj.profileId));
        const profileId = (profileIdObj.profileId);
        const bProfile_verified = await (await Profile.findById(profileId, { verification: 1 })).verification.isVerified;

        customResponse(req, res, 200, "Approved", {
            bProfile_verified
        })
    } catch (error) {
        customError(req, res, 401, "Rejected", {error});
    }
})

module.exports = userRouter;
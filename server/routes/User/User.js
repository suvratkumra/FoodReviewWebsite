const { Router } = require("express");
const customResponse = require("../../utils/responseTemplate");
const authorization = require("../../utils/protected");
const { loginUserCtrl, createUserCtrl, forgotPasswordCtrl, userDetailsByIdCtrl } = require("../../controller/userCtrl");

const userRouter = Router();

// LOGIN
userRouter.post("/login", loginUserCtrl)

// CREATE
userRouter.post("/create", createUserCtrl);

// FORGOT PASSWORD
userRouter.post("/login/forgot-password", forgotPasswordCtrl)

// GET USER DETAILS BY ID
userRouter.get("/:id", authorization, userDetailsByIdCtrl);

// -------------------
// TEMP
// -------------------
// userRouter.get("/", authorization, async (req, res) => {
//     const user = await User.findById(req.UserIdExtracted.data);
//     console.log(user);
//     customResponse(req, res, 200, "You got access", { "user_details": req.UserIdExtracted });
// })

module.exports = userRouter;
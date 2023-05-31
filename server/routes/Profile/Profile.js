const { Router } = require('express');
const User = require('../../model/UserModel');
const customResponse = require('../../utils/responseTemplate');
const customError = require('../../utils/errorTemplate');
const authorization = require('../../utils/protected');
const jwt = require('jsonwebtoken');
const updateProfileCtrl = require('../../controller/profileCtrl');

const profileRouter = Router();


// UPDATE PROFILE
// triggered from settings page, when user wants to update some of their data.
profileRouter.put("/update", authorization, updateProfileCtrl);

module.exports = profileRouter;

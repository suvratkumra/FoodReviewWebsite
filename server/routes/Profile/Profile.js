const { Router } = require('express');
const authorization = require('../../utils/protected');
const updateProfileCtrl = require('../../controller/profileCtrl');

const profileRouter = Router();

// UPDATE PROFILE
// triggered from settings page, when user wants to update some of their data.
profileRouter.put("/update", authorization, updateProfileCtrl);

module.exports = profileRouter;

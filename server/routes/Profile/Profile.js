const { Router } = require('express');
const authorization = require('../../utils/protected');
const updateProfileCtrl = require('../../controller/profileCtrl');
const customError = require('../../utils/errorTemplate');
const customResponse = require('../../utils/responseTemplate');
const Profile = require('../../model/ProfileModel');

const profileRouter = Router();

// UPDATE PROFILE
// triggered from settings page, when user wants to update some of their data.
profileRouter.put("/update", authorization, updateProfileCtrl);

// Get all the user details specified by the ID.
profileRouter.get("/:id", authorization, async(req, res) => {
    try {
        // extract the user from the id
        const id = req.params.id;
    
        const userProfile = await Profile.findById(id);

        // display all the details to the user
        customResponse(req, res, 200, "Authorized", {user});
        
    } catch (error) {
        customError(req, res, error?.status, error?.message);
    }
})

module.exports = profileRouter;

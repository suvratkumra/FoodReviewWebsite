const Profile = require("../model/ProfileModel");
const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const customResponse = require("../utils/responseTemplate");

const updateProfileCtrl = async (req, res) => {
    try {
        // get the authorization token as that is needed to decrypt the message
        const token = req.headers.authorization;
        
        // general args which will only be added to the user profile if they are defined in the database.
        const { ...Args } = req.body;

        // extract the user's profile id using the id from parameter
        const userId = req.UserIdExtracted.data;

        const profileIdObj = (await User.findById(userId, {profileId: 1}));

        const id = profileIdObj.profileId;

        const userProfile = await Profile.findByIdAndUpdate(id, 
            { ...Args },
            { new: true });

        customResponse(req, res, 200, "User successfully updated", { userProfile });

    }
    catch (err) {
        customError(req, res, err?.code, err?.message)
    }
};

module.exports = updateProfileCtrl;
const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const customResponse = require("../utils/responseTemplate");

const updateProfileCtrl = async (req, res) => {
    try {
        // get the authorization token as that is needed to decrypt the message
        const token = req.headers.authorization;

        const { address, phoneNumber } = req.body;

        const user = await User.findByIdAndUpdate(req.UserIdExtracted.data, {
            address,
            phoneNumber
        },
            { new: true });

        customResponse(req, res, 200, "User successfully updated", { user });

    }
    catch (err) {
        customError(req, res, err?.code, err?.message)
    }
};

module.exports = updateProfileCtrl;
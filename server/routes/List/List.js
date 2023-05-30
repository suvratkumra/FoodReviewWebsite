const { Router } = require("express");
const protectedCreateList = require("../../utils/protected");
const List = require("../../model/ListModel");
const customResponse = require("../../utils/responseTemplate");
const customError = require("../../utils/errorTemplate");
const authorization = require("../../utils/protected");
const User = require("../../model/UserModel");

const listRouter = Router();

// NEVER USE THIS ROUTE IN THE FRONT_END, ADD VERIFICATION LATER.
listRouter.get("/", async (req, res) => {
    try {
        const lists = await List.find();
        customResponse(req, res, 200, "Approved", { lists });
    }
    catch (err) {
        customError(req, res, err?.code, err?.message);
    }
})

listRouter.post("/create", authorization, async (req, res) => {

    try {
        // get the bare minimum for it from the body
        const { restaurantName, dishes } = req.body;

        const userId = req.UserIdExtracted.data;
        const list = await List.create({ restaurantName, dishes, userId: userId });

        if (list) {
            // update the user as well
            const user = await User.findByIdAndUpdate(userId, {
                $push: { lists: list }
            }, { new: true });
        }

        customResponse(req, res, 200, "Created new List", { list });
    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }


})

module.exports = listRouter;
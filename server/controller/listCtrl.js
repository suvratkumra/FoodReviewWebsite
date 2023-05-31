const List = require("../model/ListModel");
const User = require("../model/UserModel");
const customError = require("../utils/errorTemplate");
const customResponse = require("../utils/responseTemplate");

const getAllLists = async (req, res) => {
    try {
        const lists = await List.find();
        customResponse(req, res, 200, "Approved", { lists });
    }
    catch (err) {
        customError(req, res, err?.code, err?.message);
    }
};

const createNewList = async (req, res) => {

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


};

const getMyListsCtrl = async (req, res) => {
    // get the lists for the user
    try {
        const userId = req.UserIdExtracted.data;

        // get just the restaurant names
        const lists = await List.find({ userId: userId }, { restaurantName: true });

        customResponse(req, res, 200, "Lists extracted", { lists });
    } catch (e) {
        customError(req, res, e?.status, e?.message);
    }
}

const getMyListByIdCtrl = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.UserIdExtracted.data;

        const list = await List.findById(id);

        customResponse(req, res, 200, "List extractd", { list });
    } catch (e) {
        customError(req, res, e?.status, e?.message);
    }
}

module.exports = { createNewList, getAllLists, getMyListByIdCtrl, getMyListsCtrl };

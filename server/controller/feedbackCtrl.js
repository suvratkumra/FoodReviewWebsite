const Feedback = require("../model/FeedbackModel");
const customError = require("../utils/errorTemplate");
const customResponse = require("../utils/responseTemplate");

const getAllFeedbackCtrl = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        customResponse(req, res, 200, "Approved", { feedbacks })
    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }
};

const getMyFeedbackCtrl = async (req, res) => {
    try {
        const userID = req.UserIdExtracted.data;
        const feedback = await Feedback.findOne({ user: userID });

        if (feedback) {
            customResponse(req, res, 200, "Feedback Found", { feedback });
        }
        else {
            customError(req, res, 404, "Feedback Not Found");
        }
    } catch (e) {
        customError(req, res, e?.status, e?.message)
    }
};

const createFeedbackCtrl = async (req, res) => {
    try {
        const { ratings, description } = req.body;

        // extract the userid from token
        const userId = req.UserIdExtracted.data;
        const feedback = await Feedback.create({ user: userId, ratings, description });
        customResponse(req, res, 200, "Feedback Created", feedback);

    } catch (error) {
        // console.log(error);
        customError(req, res, error?.status, error?.message);
    }
};

module.exports = { getAllFeedbackCtrl, getMyFeedbackCtrl, createFeedbackCtrl };
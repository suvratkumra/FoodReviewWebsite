const { Router } = require('express');
const Feedback = require('../../model/FeedbackModel');
const customResponse = require('../../utils/responseTemplate');
const customError = require('../../utils/errorTemplate');
const authorization = require('../../utils/protected');
const { verify } = require('jsonwebtoken');


const feedbackRouter = Router();

feedbackRouter.get("/all", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();

        customResponse(req, res, 200, "Approved", { feedbacks })
    } catch (err) {
        customError(req, res, err?.code, err?.message);
    }
});

feedbackRouter.get("/my-feedback", authorization, async (req, res) => {
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
})

feedbackRouter.post("/create", authorization, async (req, res) => {
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
});

module.exports = feedbackRouter;
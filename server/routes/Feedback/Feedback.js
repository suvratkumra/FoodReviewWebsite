const { Router } = require('express');
const authorization = require('../../utils/protected');
const { getAllFeedbackCtrl, getMyFeedbackCtrl, createFeedbackCtrl } = require('../../controller/feedbackCtrl');

const feedbackRouter = Router();

feedbackRouter.get("/all", getAllFeedbackCtrl);

feedbackRouter.get("/my-feedback", authorization, getMyFeedbackCtrl);

feedbackRouter.post("/create", authorization, createFeedbackCtrl);

module.exports = feedbackRouter;
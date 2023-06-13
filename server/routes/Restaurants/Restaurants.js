const { default: axios } = require('axios');
const { Router } = require('express');
const customError = require('../../utils/errorTemplate');
const authorization = require('../../utils/protected');
const customResponse = require('../../utils/responseTemplate');
const restRouter = Router();

restRouter.get("/", async (req, res) => {
    console.log("restaurant router");
    customResponse(req, res, 200, "Approved");
})

// endpoint to get the restaurants nearby. 
restRouter.get("/nearby/", async (req, res) => {
    // define the query parameters
    const { location, radius, pageToken } = req.query;


})

module.exports = restRouter;
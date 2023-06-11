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

restRouter.get("/nearby/", async (req, res) => {
    // endpoint to get the restaurants nearby.

    // define the query parameters
    const { location, type, radius } = req.query;

    // console.log(latitude, " ", longitude, " ", type, " ", ratings, " ");

    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&key=${process.env.GEOLOCATION_MAPS_API_KEY}&type=${type}`)
        .then((response) => {
            const data = response.data;
            customResponse(req, res, 200, "Authorized",
                { dataReceived: data }
            );
        })
        .catch((error) => {
            customError(req, res, error?.code, error?.message);
        })
})

module.exports = restRouter;
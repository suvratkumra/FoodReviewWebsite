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
    const { latitude, longitude, radius, limit } = req.query;

    // console.log(latitude, longitude, radius);

    const options = {
        params: {
            latitude: latitude,
            longitude: longitude,
            radius: radius,
            limit: 20,
            offset: 0
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.YELP_API_KEY
        }
    };

    axios
        .get("https://api.yelp.com/v3/businesses/search", options)
        .then(function (response) {
            customResponse(req, res, 200, "Approved", { data: response.data })
        })
        .catch(function (error) {
            customError(req, res, 200, "Rejected", JSON.parse(error))
        });
})

restRouter.get("/search/:id", async (req, res) => {
    const options = {
        params: {
            location: 'Toronto',
            term: req.params.id,
            sort_by: 'best_match',
            limit: '20'
        },
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + process.env.YELP_API_KEY
        }
    };

    axios.get('https://api.yelp.com/v3/businesses/search', options)
        .then((response) => {
            console.log(response);
            customResponse(req, res, 200, "Approved", {data: response.data})
        })
        .catch((error) => { console.log("error", error) })
})

module.exports = restRouter;
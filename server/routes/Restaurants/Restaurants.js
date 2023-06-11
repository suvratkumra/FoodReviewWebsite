const {Router} = require('express');
const customResponse = require('../../utils/responseTemplate');
const restRouter = Router();

restRouter.get("/", async(req,res) => {
    console.log("restaurant router");
    customResponse(req, res, 200, "Approved");
})

module.exports = restRouter;
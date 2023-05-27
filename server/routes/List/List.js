const { Router } = require("express");
const protectedCreateList = require("../../utils/protected");

const listRouter = Router();

listRouter.get("/", async (req, res) => {

})

listRouter.post("/create", protectedCreateList, async (req, res) => {

})

module.exports = listRouter;
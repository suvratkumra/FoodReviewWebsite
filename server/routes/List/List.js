const { Router } = require("express");
const authorization = require("../../utils/protected");
const { createNewList, getAllLists, getMyListsCtrl, getMyListByIdCtrl, userOptionsCtrl } = require("../../controller/listCtrl");
const parser = require('../../utils/cloudinaryConnect.js');

const listRouter = Router();

// NEVER USE THIS ROUTE IN THE FRONT_END, ADD VERIFICATION LATER.
listRouter.get("/", getAllLists)

listRouter.get("/my-lists", authorization, getMyListsCtrl)

listRouter.get("/my-lists/:id", authorization, getMyListByIdCtrl)

listRouter.post("/create", authorization, parser.array('file'), createNewList)

listRouter.get("/user-options", userOptionsCtrl)

module.exports = listRouter;
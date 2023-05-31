const { Router } = require("express");
const authorization = require("../../utils/protected");
const { createNewList, getAllLists, getMyListsCtrl, getMyListByIdCtrl } = require("../../controller/listCtrl");


const listRouter = Router();

// NEVER USE THIS ROUTE IN THE FRONT_END, ADD VERIFICATION LATER.
listRouter.get("/", getAllLists)

listRouter.get("/my-lists", authorization, getMyListsCtrl)

listRouter.get("/my-lists/:id", authorization, getMyListByIdCtrl)

listRouter.post("/create", authorization, createNewList)

module.exports = listRouter;
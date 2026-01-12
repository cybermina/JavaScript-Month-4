const { Router } = require("express");
const userController = require("../controller/user.controller");

const userRouter = Router();

userRouter.get("/", userController.GET_USERS);

userRouter.route("/:id")
.get(userController.GET_USERS)
.put(userController.UPDATE_USER)
.delete(userController.DELETE_USER)

userRouter.post("/create", userController.CREATE_USER);

module.exports = userRouter;
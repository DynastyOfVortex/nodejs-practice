const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
 
userRouter.use("/test", userController.letTest);
userRouter.use("/postuser", userController.postUser);
userRouter.use("/create", userController.addUser);
userRouter.use("/", userController.getUsers);
 
module.exports = userRouter;
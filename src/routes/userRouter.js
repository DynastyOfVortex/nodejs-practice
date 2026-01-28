const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();
 
userRouter.get("/test", userController.letTest);
userRouter.post("/postuser", userController.postUser);
userRouter.get("/create", userController.addUser);
userRouter.get("/", userController.getUsers);
 
module.exports = userRouter;
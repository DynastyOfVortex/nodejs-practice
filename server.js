const express = require("express");
const app = express();
const userRouter = require("./src/routes/userRouter.js");
const homeRouter = require("./src/routes/homeRouter.js");
require('dotenv').config()
 
app.set("view engine", "hbs");
app.set("views", __dirname + `/src/views`);
app.use(express.urlencoded({ extended: false }));
 
app.use("/users", userRouter);
app.use("/", homeRouter);
 
app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});
 
// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
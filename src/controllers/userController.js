const User = require("../models/user.js");

exports.createTable = async function (request, response) {
  const user = await User.createTable();
  response.status(201).json({
    success: true,
    data: user,
  });
};

exports.letTest = async function (request, response) {
  const test = await User.myTest();
  response.status(201).json({
    success: true,
    data: test,
  });
};

exports.getUsers = async function (request, response) {
  try {
    const allUsers = await User.getAll();
    console.log("Fetched users:", allUsers);
    response.render("users.hbs", { users: allUsers });
  } catch (error) {
    console.error("Error in getUsers:", error);
    response.status(500).send("Internal Server Error");
  }
};

exports.addUser = function (request, response) {
  response.render("create.hbs");
};

exports.postUser = function (request, response) {
  const username = request.body.name;
  const userage = request.body.age;
  const user = new User(username, userage);
  user.save();
  response.redirect("/users");
};

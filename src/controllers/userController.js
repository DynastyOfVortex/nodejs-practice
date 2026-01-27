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
        data: test
    });
};

exports.addUser = function (request, response) {
  response.render("create.hbs");
};
exports.getUsers = async function (request, response) {
  const allUsers = await User.getAll();
  console.log(allUsers);
  response.render("users.hbs", { users: allUsers });
};
exports.postUser = function (request, response) {
  const username = request.body.name;
  const userage = request.body.age;
  const user = new User(username, userage);
  user.save();
  response.redirect("/users");
};

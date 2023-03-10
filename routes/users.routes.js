const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/User");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("items", {
    name: 1,
    codigo: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  try {
    const { body } = request;
    const { username, password } = body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    // TODO: Ajustar el mensaje de error del plugin de express-unique-validator
    response.status(400).json(error.errors.username.message);
    // response.status(400).json(`Error, expected ${error.errors.username}`);
  }
});

module.exports = usersRouter;

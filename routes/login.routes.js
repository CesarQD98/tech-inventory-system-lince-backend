const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/User");

loginRouter.post("/", async (request, response) => {
  const { body } = request;
  const { username, password } = body;

  const user = await User.findOne({ username });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    console.log("dentro del if");
    response.status(401).json({
      error: "Invalid username or password!",
    });
  } else {
    console.log("dentro del else");
    const userForToken = {
      id: user._id,
      username: user.username,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    response.send({
      username: user.username,
      token,
    });
  }
});

module.exports = loginRouter;

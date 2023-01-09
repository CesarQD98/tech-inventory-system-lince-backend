const itemsRouter = require("express").Router();
const Item = require("../models/Item");
const User = require("../models/User");

itemsRouter.post("/", async (request, response) => {
  const { name, codigo, marca, userId } = request.body;

  const user = await User.findById(userId);
});

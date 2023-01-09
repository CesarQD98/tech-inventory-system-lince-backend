const itemsRouter = require("express").Router();
const Item = require("../models/Item");
const User = require("../models/User");

itemsRouter.get("/", async (request, response) => {
  const items = await Item.find({}).populate("createdBy", {
    username: 1,
  });
  response.json(items);
});

itemsRouter.post("/", async (request, response) => {
  const { name, codigo, marca, createdBy } = request.body;

  const user = await User.findById(createdBy);

  const newItem = new Item({
    name,
    codigo,
    marca,
    createdBy: user._id,
  });

  try {
    const savedItem = await newItem.save();

    user.items = user.items.concat(savedItem._id);
    await user.save();

    response.json(savedItem);
  } catch (error) {
    next(error);
  }
});

module.exports = itemsRouter;

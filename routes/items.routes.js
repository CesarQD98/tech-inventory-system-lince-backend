const itemsRouter = require("express").Router();

const userExtractor = require("../middleware/userExtractor");

const Item = require("../models/Item");
const User = require("../models/User");

itemsRouter.get("/", async (request, response) => {
  const items = await Item.find({}).populate("createdBy", {
    username: 1,
    _id: 0,
  });
  response.json(items);
});

itemsRouter.post("/", userExtractor, async (request, response, next) => {
  const { name, codigo, marca } = request.body;

  const { userId } = request;

  const user = await User.findById(userId);

  const newItem = new Item({
    name,
    codigo,
    marca,
    createdBy: userId,
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

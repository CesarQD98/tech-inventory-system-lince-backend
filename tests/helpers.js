const { app } = require("../index");
const supertest = require("supertest");

const User = require("../models/User");
const Item = require("../models/Item");

const api = supertest(app);

const getUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map((user) => user.toJSON());
};

const getItems = async () => {
  const itemsDB = await Item.find({});
  return itemsDB.map((item) => item.toJSON());
};

module.exports = {
  api,
  getUsers,
  getItems,
};

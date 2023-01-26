const bcrypt = require("bcrypt");

const User = require("../models/User");
const Item = require("../models/Item");

const { api, getUsers, getItems } = require("./helpers");
const mongoose = require("mongoose");
const { server } = require("../index");

describe("Test sobre API", () => {
  describe("USER TESTS", () => {
    beforeEach(async () => {
      await User.deleteMany({});

      const passwordHash = await bcrypt.hash("pswd", 10);
      const user = new User({ username: "test_user", passwordHash });

      await user.save();
    });

    test("works as expected creating a fresh username", async () => {
      const usersAtStart = await getUsers();

      const newUser = {
        username: "new_test_user",
        password: "123",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await getUsers();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("creation fails with proper status code and message if username is already taken", async () => {
      const usersAtStart = await getUsers();

      const newUser = {
        username: "test_user",
        password: "123",
      };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body).toContain("`username` to be unique");

      const usersAtEnd = await getUsers();
      expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
  });

  describe("ITEM TESTS", () => {
    beforeEach(async () => {
      await Item.deleteMany({});
    });

    let loggedUserToken = "";
    test("Login succesfully to create new items", async () => {
      // console.log(process.env.PORT);
      const credentials = {
        username: "test_user",
        password: "pswd",
      };

      const loggedUser = await api
        .post("/api/login")
        .send(credentials)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      loggedUserToken = loggedUser.body.token;
    });

    test("Logged User creates a new item", async () => {
      const itemsAtStart = await getItems();
      expect(itemsAtStart).toHaveLength(0);

      const newItem = {
        name: "test_item",
        codigo: "test_code",
        marca: "test_brand",
        deliveryTime: "test_time",
        deliveryLoc: "test_location",
        proveedor: "test_supplier",
      };

      await api
        .post("/api/items")
        .set("Authorization", `bearer ${loggedUserToken}`)
        .send(newItem)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const itemsAtEnd = await getItems();
      expect(itemsAtEnd).toHaveLength(1);

      const names = itemsAtEnd.map((n) => n.name);
      expect(names).toHaveLength(1);
      expect(names).toContain(newItem.name);
    });
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});

const bcrypt = require("bcrypt");

const User = require("../models/User");

const { api, getUsers } = require("./helpers");
const mongoose = require("mongoose");
const { server } = require("../index");

describe("Creating a new user", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("pswd", 10);
    const user = new User({ username: "test_usuario", passwordHash });

    await user.save();
  });

  test("works as expected creating a fresh username", async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: "testeando",
      password: "str0ngp4ssw0rd",
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
      username: "test_usuario",
      password: "test_password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.errors.username.message).toContain(
      "`username` to be unique"
    );

    const usersAtEnd = await getUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});

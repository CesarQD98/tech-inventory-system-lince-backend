const mongoose = require("mongoose");

const connectionString = process.env.MONGO_TEST_DB_URI;

// Conexión a MongoDB
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

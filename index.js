require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const usersRouter = require("./routes/user.routes");

app.use(cors()); // TODO: Revisar acerca de CORS
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.ip);
  console.log(request.ips);
  console.log(request.originalUrl);
  response.send("<h3>Tech-Innovation API de Inventario</h3>");
});

app.use("/api/users", usersRouter);
// app.use("/api/items", itemsRouter);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };

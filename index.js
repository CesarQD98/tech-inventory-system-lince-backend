require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

const handleErrors = require("./middleware/handleErrors");
const userExtractor = require("./middleware/userExtractor");

const usersRouter = require("./routes/users.routes");
const itemsRouter = require("./routes/items.routes");
const loginRouter = require("./routes/login.routes");

app.use(cors()); // TODO: Revisar acerca de CORS
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.ip);
  console.log(request.ips);
  console.log(request.originalUrl);
  response.send("<h3>Tech-Innovation API de Inventario</h3>");
});

app.use("/api/login", loginRouter);

// Ensures every request needs a token to proceed
app.use(userExtractor);
app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);

console.log("Antes del handleErrors!");

app.use(handleErrors);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };

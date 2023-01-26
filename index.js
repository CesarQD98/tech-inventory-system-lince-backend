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
// Dado que no se quiere que hayan requests externos a la organización
// se opta por denegar la creación de usuarios. Se tendrá que realizar
// vía la db.
app.use("/api/users", usersRouter);

// Asegura que cada request sea con token
app.use(userExtractor);
app.use("/api/items", itemsRouter);

app.use(handleErrors);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };

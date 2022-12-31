require("dotenv").config();
require("./mongo");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.ip);
  console.log(request.ips);
  console.log(request.originalUrl);
  response.send("<h1>Tech-Innovation API de Inventario</h1>");
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };

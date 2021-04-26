const cors = require('cors')
const express = require("express");
const server = express();
const routes = require("./routes")

server.use(cors())

server.use(express.json());

server.use(routes)

server.use(express.json());

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log("Rodando na porta: " + port);
});

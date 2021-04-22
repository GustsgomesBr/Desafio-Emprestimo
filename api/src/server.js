const cors = require('cors')
const express = require("express");
const server = express();
const routes = require("./routes")

server.use(cors())

server.use(routes)

server.use(express.json());

server.listen(3000, () => console.log('Servidor rodando na porta 3000'))
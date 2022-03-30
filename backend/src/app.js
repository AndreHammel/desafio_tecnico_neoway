const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const error = require('./middlewares/error')
const logServer = require('./middlewares/logServer')

const app = express();
app.use(express.json());
app.use(cors())
app.use(logServer)
app.use('/cpf-cnpj-manager', routes)
app.use(error)

module.exports = app;

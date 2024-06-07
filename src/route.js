const express = require('express');
const route = express.Router();
const ControllerRaiz = require('./Controllers/ControllerRaiz');
const ControllerCliente = require('./Controllers/ControllerCliente');

route.get('/', ControllerRaiz.raiz);

route.get('/cliente', ControllerCliente.getClientes);
route.post('/cliente', ControllerCliente.createCliente);

module.exports = route;
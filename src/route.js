const express = require('express');
const route = express.Router();
const ControllerRaiz = require('./Controllers/ControllerRaiz');
const ControllerCliente = require('./Controllers/ControllerCliente');

route.get('/', ControllerRaiz.raiz);

// Cliente
route.get('/cliente', ControllerCliente.getClientes);
route.post('/cliente', ControllerCliente.createCliente);
route.put('/cliente/:cli_cod', ControllerCliente.updateCliente);
route.delete('/cliente/:cli_cod', ControllerCliente.deleteCliente);

module.exports = route;
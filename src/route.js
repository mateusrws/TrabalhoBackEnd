const express = require('express');
const route = express.Router();
const ControllerRaiz = require('./Controllers/ControllerRaiz');
const ControllerCliente = require('./Controllers/ControllerCliente');
const ControllerProduto = require('./Controllers/ControllerProduto');
const ControllerVendas = require('./Controllers/ControllerVendas');

route.get('/', ControllerRaiz.raiz);

// Cliente
route.get('/cliente', ControllerCliente.getClientes);
route.post('/cliente', ControllerCliente.createCliente);
route.put('/cliente/:cli_cod', ControllerCliente.updateCliente);
route.delete('/cliente/:cli_cod', ControllerCliente.deleteCliente);

// Produto
route.get('/produto', ControllerProduto.getProdutos);
route.post('/produto', ControllerProduto.createProduto);
route.put('/produto/:pro_cod', ControllerProduto.updateProduto);
route.delete('/produto/:pro_cod', ControllerProduto.deleteProduto);

// Vendas
route.get('/vendas', ControllerVendas.getVendas);
route.post('/vendas', ControllerVendas.createVendas);

module.exports = route;
const express = require('express');
const route = express.Router();
const ControllerRaiz = require('./Controllers/ControllerRaiz');

route.get('/', ControllerRaiz.raiz);

module.exports = route;
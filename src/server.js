const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./route');

app.use(route);
app.use(cors);
app.use(express.json());

app.listen(3344, ()=> console.log('Server listening on port 3344'));
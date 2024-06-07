const express = require('express');
const app = express();
const cors = require('cors');
const route = require('./route');

app.use(cors());
app.use(express.json()); 
app.use(route);

app.listen(process.env.PORT || 3344, () => console.log('Server listening on port 3344'));

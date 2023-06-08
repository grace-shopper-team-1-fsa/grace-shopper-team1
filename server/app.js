const express = require('express');
const app = express();
const path = require('path');
const routes = require('./api');

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.use('/api', routes);

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));


module.exports = app;

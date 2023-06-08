const express = require('express');
const app = express();
const path = require('path');
const routes = require('./api');
const cors = require('cors');

const corsOptions ={
    origin:'*',
    credentials:true,      //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions));

app.use(express.json());

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));

app.use('/api', routes);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://vaseshopper.onrender.com"); // update to match the domain you will make the request from
   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../static/index.html')));


module.exports = app;

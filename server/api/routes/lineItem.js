const express = require('express');
const app = express.Router();
const { LineItem } = require('../../db');


app.get('/', async(req, res, next)=>{
    try{
        const lineItems = await LineItem.findAll();
        res.send(lineItems);
    }catch(er){
        next(er);
    }
})

app.get('/:id', async(req, res, next)=>{
    try{
        const lineItem = await LineItem.findByPk(req.params.id);
        res.send(lineItem);
    }catch(er){
        next(er);
    }
})

app.post('/', async(req, res, next)=>{
    try{
        res.status(201).send(await LineItem.create(req.body));
    } catch(ex){
        next(ex)
    }
})


module.exports = app;
const express = require('express');
const app = express.Router();
const { Product } = require('../../db');


app.get('/', async(req, res, next)=>{
    try{
        const product = await Product.findAll();
        res.send(product);
    }catch(er){
        next(er);
    }
})

app.get('/:id', async(req, res, next)=>{
    try{
        const product = await Product.findByPk(req.params.id);
        res.send(product);
    }catch(er){
        next(er);
    }
})

app.post('/', async(req, res, next)=>{
    try{
        res.send('POST at api/product')
    } catch(ex){
        next(ex)
    }
})


module.exports = app;
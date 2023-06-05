const express = require('express');
const app = express.Router();
const { Review } = require('../db');

module.exports = app;

app.post('/', async(req, res, next)=>{
    try{
        const review = await Review.findAll();
        res.send(review);
    } catch(er){
        next(er)
    }
})

app.get('/:id', async(req, res, next)=>{
    try{
        const reviews = await Review.findAll({where:{productId: req.params.id}});
    }catch(er){
        next(er);
    }
})


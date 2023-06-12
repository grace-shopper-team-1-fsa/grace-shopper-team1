const express = require('express');
const app = express.Router();
const { Review } = require('../../db');

app.get('/', async(req, res, next)=>{
    try{
        const reviews = await Review.findAll();
        res.send(reviews);
    }catch(er){
        next(er);
    }
})
app.post('/', async(req, res, next)=>{
    try{
        res.status(201).send(await Review.create(req.body));
    } catch(er){
        next(er)
    }
})
app.get('/:id', async(req, res, next)=>{
    try{
        const reviews = await Review.findAll({where:{productId: req.params.id}});
        res.send(reviews);
    }catch(er){
        next(er);
    }
})





module.exports = app;

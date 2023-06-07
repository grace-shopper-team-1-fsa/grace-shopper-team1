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
        res.status(201).send(await Product.create(req.body));
    } catch(ex){
        next(ex)
    }
})

app.put('/:id', async (req, res, next) => {
    try {
        const product = await Product.findByPk(req.params.id);
        await product.update(req.body);
        res.send(product)
    } catch(err){
        next(err)
    }
})

app.delete('/:id', async(req, res, next) =>{
    try{
        console.log(req.params.id);
        await Product.destroy({where: { id: req.params.id} });
        res.sendStatus(204);
    } catch(er) {
        next(er);
    }
})


module.exports = app;
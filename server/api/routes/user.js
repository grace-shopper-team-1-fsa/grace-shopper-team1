const express = require('express');
const app = express.Router();
const { User } = require('../../db');

app.get('/', async(req, res, next)=>{
    try{
        const user = await User.findAll();
        res.send(user)
    }catch(er){
        next(er);
    }
})

app.get('/:id', async(req, res, next)=>{
    try{
        const user = await User.findByPk(req.params.id);
        res.send(user);
    }catch(er){
        next(er);
    }
})

app.post('/', async(req, res, next)=>{
    try{
        const newUser = await User.create(req.body);
        res.send(newUser);
    } catch(ex){
        next(ex)
    }
})

app.put('/:id', async(req, res, next)=>{
    const userId = req.params.id;
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            res.status(404).send('User not found');
        } else {
            const updatedUser = await user.update(req.body);
            res.send(updatedUser);
        }
    }catch(er){
        next(er);
    }
})


module.exports = app;
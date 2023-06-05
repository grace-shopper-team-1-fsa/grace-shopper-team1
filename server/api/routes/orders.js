const express = require('express');
const router = express.Router();
const { User } = require('../../db');


router.post('/', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.createOrder());
  }
  catch(ex){
    next(ex);
  }
});

router.get('/cart', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCart());
  }
  catch(ex){
    next(ex);
  }
});

router.post('/cart', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.addToCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});

router.put('/cart', async(req, res, next)=> {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCart(req.body));
  }
  catch(ex){
    next(ex);
  }
});


module.exports = router;
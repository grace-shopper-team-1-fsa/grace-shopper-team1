const express = require('express');
const router = express.Router();
const { User, Order } = require('../../db');

router.get('/', async(req, res, next)=> {
  try {
    const order = await Order.findAll();;
    res.send(order)
  }
  catch(ex){
    next(ex);
  }
});

router.get('/:id', async(req, res, next)=>{
  try{
      const order = await Order.findByPk(req.params.id);
      res.send(order);
  }catch(er){
      next(er);
  }
})


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
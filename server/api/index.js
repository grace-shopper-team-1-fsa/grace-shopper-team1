const express = require('express');
const router = express.Router();
const authRouter = require('./routes/auth.js')
const lineItemRouter = require('./routes/lineItem.js')
const ordersRouter = require('./routes/orders.js')
const productRouter = require('./routes/product.js')
const reviewRouter = require('./routes/review.js')
const userRouter = require('./routes/user.js');


router.use('/auth', authRouter);
router.use('/lineitem', lineItemRouter);
router.use('/orders', ordersRouter);
router.use('/products', productRouter);
router.use('/reviews', reviewRouter);
router.use('/user', userRouter);

router.get('/', (req, res, next) => {
    res.send('at /api')
})


module.exports = router;
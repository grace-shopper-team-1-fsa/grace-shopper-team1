import {configureStore} from "@reduxjs/toolkit";
import logger from 'redux-logger';
import auth from './auth';
import cart from './cart';
import orders from './orders';
import productsSlice from './productsSlice';
import reviewSlice from './reviewSlice';
import user from './user';

const store = configureStore({
  middleware: (defaultMiddleware)=> defaultMiddleware().concat(logger),
  reducer:{
    auth: auth,
    cart: cart,
    orders: orders,
    reviews: reviewSlice,
    products: productsSlice,
    users: user,
  }
});

export default store;
export * from './auth';
export * from './cart';
export * from './orders';
export * from './productsSlice';
export * from './reviewSlice';
export * from './user';


import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState={
  lineItems: [],
  total: 0
}

const orderCart = (cart) => {
  console.log(cart);
  cart.lineItems.sort((a, b) => (a.createdAt < b.createdAt) ? 1: -1);
  return cart;
}

export const fetchCart = createAsyncThunk("fetchCart", async()=>{
  console.log('in fetchcart');
  try{
    const token = window.localStorage.getItem('token');
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    if(token){
      const {data} = await axios.get('/api/orders/cart', {
        headers: {
          authorization: token
        }
      });
      console.log('inToken')
      console.log(data)
      console.log(cart)
      if(cart.lineItems !== null && cart.lineItems.length > 0){
        console.log('in cart not null')
        let newCart = {};
        for(let i = 0; i < cart.lineItems.length; i++){
          newCart = await axios.post('/api/orders/cart', cart.lineItems[i], {
            headers:{
              authorization: token
            }
          });
        }

        window.localStorage.removeItem("cart");
        return newCart.data;
      }
      console.log(data);
      return data;
    } else if(cart === null){
      window.localStorage.setItem('cart', JSON.stringify(initialState));
      return initialState;
    } else {
      return cart;
    }
  }catch(err){
    console.log(err)
  }
})

export const removeItem = createAsyncThunk("removeItem", async(removeItems)=>{
  try{
    const token = window.localStorage.getItem('token');
    if(token){
      const {data} = await axios.put('/api/orders/cart', removeItems, {
        headers: {
          authorization: token
        }
      });
      return data;
    } else {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      const modifyItem = cart.lineItems.find(e=> e.product.id === removeItems.product.id);
      modifyItem.quantity -= removeItems.quantityToRemove;
      if(modifyItem.quantity === 0){
        cart.lineItems = cart.lineItems.filter(e=> e.product.id !== removeItems.product.id);
      }
      cart.total -= (removeItems.product.price*removeItems.quantityToRemove);
      window.localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
  }catch(er){
    console.log(er);
  }
})

export const addItem = createAsyncThunk("addItem", async(addItem)=>{
  
  try{
    const token = window.localStorage.getItem('token');
    if(token){
      console.log('line 91 add item')
      const {data} = await axios.post('/api/orders/cart', addItem, {
        headers:{
          authorization: token
        }
      });
      return data;
    } else {
      const cart = JSON.parse(window.localStorage.getItem('cart'));
      const modifyItem = cart.lineItems.find(e=> e.product.id === addItem.product.id);
      if(modifyItem){
        modifyItem.quantity += Number(addItem.quantity);
      } else {
        cart.lineItems.push({ product: addItem.product, quantity: Number(addItem.quantity)});
      }
      cart.total += (addItem.product.price*Number(addItem.quantity));
      window.localStorage.setItem('cart', JSON.stringify(cart));
      return cart;
    }
  }catch(er){
    console.log(er);
  }
})

const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchCart.fulfilled, (state, action)=>{
      orderCart(action.payload);
      return action.payload;
    }),
    builder.addCase(removeItem.fulfilled, (state, action)=>{
      orderCart(action.payload);
      return action.payload;
    }),
    builder.addCase(addItem.fulfilled, (state, action)=>{
      orderCart(action.payload);
      return action.payload;
    })
  }
})

export default cartSlice.reducer;



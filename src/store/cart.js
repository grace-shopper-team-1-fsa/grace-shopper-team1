import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState={
  lineItems: [],
  total: 0
}

const orderCart = (cart) => {
  cart.lineItems.sort((a, b) => (a.createdAt < b.createdAt) ? 1: -1);
  return cart;
}

export const fetchCart = createAsyncThunk("fetchCart", async()=>{
  console.log('in fetchcart');
  try{
    const token = window.localStorage.getItem('token');
    const cart = JSON.parse(window.localStorage.getItem('cart'));
    console.log(token)
    if(token){
      console.log('made it in token')
      const {data} = await axios.get('/api/orders/cart', {
        headers: {
          authorization: token
        }
      });
      if(cart !== null){
        console.log('made it in cart not null new user')
      
        cart.lineItems.forEach(async(e)=>{
          await axios.post('/api/orders/cart', e, {
            headers:{
              authorization: token
            }
          });
          
          console.log('above is in for each')
        })
        window.localStorage.removeItem("cart");
        //console.log('reaching 33')
        //console.log(data);
        const response = await axios.get('/api/orders/cart', {
          headers: {
            authorization: token
          }
        });
       console.log(response.data);
        return response.data;
      }
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
  console.log(addItem);
  try{
    const token = window.localStorage.getItem('token');
    if(token){
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



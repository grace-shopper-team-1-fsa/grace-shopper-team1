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
  try{
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders/cart', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }catch(err){
    console.log(err)
  }
})

export const removeItem = createAsyncThunk("removeItem", async(removeItems)=>{
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.put('/api/orders/cart', removeItems, {
      headers: {
        authorization: token
      }
    });
    return data;
  }catch(er){
    console.log(er);
  }
})

export const addItem = createAsyncThunk("addItem", async(addItem)=>{
  
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.post('/api/orders/cart', addItem, {
      headers:{
        authorization: token
      }
    });
    return data;
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



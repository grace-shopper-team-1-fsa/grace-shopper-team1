import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

const initialState={
  lineItems: []
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
  console.log(addItem)
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.post('/api/orders/cart', addItem, {
      headers:{
        authorization: token
      }
    });
    console.log(data)
    return data;
  }catch(er){
    console.log('in the catch')
    console.log(er);
  }
})

const cartSlice = createSlice({
  name:"cart",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder.addCase(fetchCart.fulfilled, (state, action)=>{
      return action.payload;
    }),
    builder.addCase(removeItem.fulfilled, (state, action)=>{
      return action.payload;
    }),
    builder.addCase(addItem.fulfilled, (state, action)=>{
      return action.payload;
    })
  }
})

export default cartSlice.reducer;

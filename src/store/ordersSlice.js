import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchOrders = createAsyncThunk("fetchOrders", async()=>{
  try{
    const token = window.localStorage.getItem('token');
    const response = await axios.get('/api/orders', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }catch(err){
    console.log(err)
  }
})

export const createOrder = createAsyncThunk("createOrder", async()=>{
  try{
    const token = window.localStorage.getItem('token');
    const {data} = await axios.post('/api/orders/', null, {
      headers:{
        authorization: token
      }
    }); // added null instead of addItems 
    return data;
  }catch(er){
    console.log(er);
  }
})



const ordersSlice = createSlice({
  name:"orders",
  initialState:[],
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(fetchOrders.fulfilled, (state, action)=>{
      return action.payload;
    })
    .addCase(createOrder.fulfilled, (state, action) => {
      //state.status = 'succeeded';
      return [...state, action.payload]
    })
  }
})

export default ordersSlice.reducer;

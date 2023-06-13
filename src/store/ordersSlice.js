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

export const updateIsCart = createAsyncThunk('toggleCartStatus', async (data) => {
  const { id } = data;
  try {
    const response = await axios.put(`/api/orders/${id}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
});


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

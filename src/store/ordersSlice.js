import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

//const initialState={
 // lineItems: []
//}
// I'm not really sure what the initial state is supposed to be. - Grant

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

// export const createOrder = createAsyncThunk("createOrder", async()=>{
//   try{
//     const token = window.localStorage.getItem('token');
//     const {data} = await axios.post('/api/orders/', addItem, {
//       headers:{
//         authorization: token
//       }
//     });
//     return data;
//   }catch(er){
//     console.log(er);
//   }
// })

export const updateIsCart = createAsyncThunk('toggleCartStatus', async (data) => {
  console.log('From cart reducer!', data)
  const { id } = data;
  try {
    const response = await axios.put(`http://localhost:3000/api/orders/${id}`, data);
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
    .addCase(updateIsCart.fulfilled, (state, action) => {
      //state.status = 'succeeded';
      state.isCart = action.payload.isCart;
    })
  }
})

export default ordersSlice.reducer;

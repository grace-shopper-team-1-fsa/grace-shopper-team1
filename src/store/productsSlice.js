import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk('fetchProducts', async()=>{
    try{
        const {data}  = await axios.get('/api/products');
        return data;
    }catch(er){
        console.log(er);
    }
})

export const addProduct = createAsyncThunk('addProduct', async(product)=>{
    try{
        const {data} = await axios.post('/api/products', product);
        return data;
    }catch(er){
        console.log(er);
    }
})

const productsSlice = createSlice({
    name:"products",
    initialState: [],
    reducers: {},
    extraReducers: (builder)=>{
      builder.addCase(fetchProducts.fulfilled, (state, action)=>{
        return action.payload;
      }),
      builder.addCase(addProduct.fulfilled, (state, action)=>{
        return [...state, action.payload];
      })
    }
  })

export default productsSlice.reducer;
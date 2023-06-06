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


export const updateProduct = createAsyncThunk('/api/product/id', async (formData) => {
  const { id } = formData;
  try {
    const response = await axios.put(`http://localhost:3000/api/users/${id}`, formData)
    return response.data;
  } catch (err) {
    console.log(err)
  }
})

const productsSlice = createSlice({
    name:"products",
    initialState: [],
    reducers: {},
    extraReducers: (builder)=>{
      builder
      .addCase(fetchProducts.fulfilled, (state, action)=>{
        return action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action)=>{
        return [...state, action.payload];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
      )})
    }
  })

export default productsSlice.reducer;
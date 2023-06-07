import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchProducts = createAsyncThunk('/api/fetchProducts', async()=>{
    try{
        const {data}  = await axios.get('/api/products');
        return data;
    }catch(er){
        console.log(er);
    }
})


export const fetchProductById = createAsyncThunk('fetchProductById', async (id) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (er) {
    console.log(er);
    throw er;
  }
});

export const addProduct = createAsyncThunk('addProduct', async(product)=>{
    try{
        const {data} = await axios.post('http://localhost:3000/api/products', product);
        return data;
    }catch(er){
        console.log(er);
    }
})


export const updateProduct = createAsyncThunk('/api/product/id', async (formData) => {
  const { id } = formData;
  try {
    const response = await axios.put(`http://localhost:3000/api/products/${id}`, formData)
    return response.data;
  } catch (err) {
    console.log(err)
  }
})

export const deleteProduct = createAsyncThunk('api/product/delete/id', async(productId) => {
  try {
    await axios.delete(`http://localhost:3000/api/products/${productId}`);
    return productId;
  } catch(err) {
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
    .addCase(fetchProductById.fulfilled, (state, action)=>{
      
      const index = state.findIndex(product => product.id === action.payload.id);

      if (index !== -1) {
        
        state[index] = action.payload;
      } else {
        
        state.push(action.payload);
      }
    })
    .addCase(addProduct.fulfilled, (state, action)=>{
      return [...state, action.payload];
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      return state.map(product => product.id === action.payload.id ? action.payload : product)
    })
    .addCase(deleteProduct.fulfilled, (state, action)=>{
      return state.filter(product => product.id !== action.payload);
  })
  }
})

export default productsSlice.reducer;
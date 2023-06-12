import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllReviews = createAsyncThunk('fetchAllReviews', async ()=>{
    try {
        const response = await axios.get('/api/reviews')
        return response.data;
    } catch (err){
        console.log(err)
    }
});

export const addReview = createAsyncThunk('addReview', async (formData) => {
    try {
      const response = await axios.post('/api/reviews', formData)
      return response.data
    } catch(err){
      console.log(err)
    }
  })

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsList: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCHING REVIEW DATA
      .addCase(fetchAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsList = action.payload;
      })
      .addCase(fetchAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ADDING REVIEWS
      .addCase(addReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsList.push(action.payload);
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
        ; 
    },
  });


  export default reviewsSlice.reducer;
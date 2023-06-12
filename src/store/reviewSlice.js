import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    reviewsList: [],
    loading: false,
    error: null
};

export const fetchAllReviews = createAsyncThunk('fetchAllReviews', async ()=>{
    try {
        const response = await axios.get('http://localhost:3000/api/reviews')
        return response.data;
    } catch (err){
        console.log(err)
    }
});

export const addReview = createAsyncThunk('addReview', async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/reviews', formData)
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
        // DELETE REVIEW 
        /*
        .addCase(deleteReviewsAsync.pending, (state) => {
          state.loading = true
        })
        .addCase(deleteReviewsAsync.fulfilled, (state, action) => {
          state.loading = false;
          state.reviewsList = state.reviewsList.filter(campus => campus.id !== action.payload);
        })
        .addCase(deleteReviewsAsync.rejected, (state, action) =>{
          state.loading = false;
          state.error = action.error.message;
        })
        // UPDATE CAMPUSES
        
        .addCase(updateReviewsAsync.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateReviewsAsync.fulfilled, (state, action) =>
          state.campusList.map(campus =>
            campus.id === action.payload.id ? action.payload : campus
        ))
        .addCase(updateReviewsAsync.rejected, (state, action) => {
          state.load = false;
        })*/
        ; 
    },
  });


  export default reviewsSlice.reducer;
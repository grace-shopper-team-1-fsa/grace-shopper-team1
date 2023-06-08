import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    reviewsList: [],
    loading: false,
    error: null
};

export const fetchAllReviewsAsync = createAsyncThunk('/api/reviews', async ()=>{
    try {
        const response = await axios.get('http://localhost:3000/api/reviews')
        return response.data;
    } catch (err){
        console.log(err)
    }
});

export const addReviewAsync = createAsyncThunk('/api/reviews/', async (formData) => {
    try {
      const response = await axios.post('http://localhost:3000/api/reviews', formData)
      return response.data
    } catch(err){
      console.log(err)
    }
  })
/*
export const deleteReviewAsync = createAsyncThunk('/api/reviews/delete', async (id) => {
try{
    await axios.delete(`http://localhost:3000/api/reviews/${id}`)
    return id;
} catch (err){
    console.log(err)
}
})

*/

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
      .addCase(fetchAllReviewsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllReviewsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsList = action.payload;
      })
      .addCase(fetchAllReviewsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ADDING REVIEWS
      .addCase(addReviewAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewsList.push(action.payload);
      })
      .addCase(addReviewAsync.rejected, (state, action) => {
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
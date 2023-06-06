import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const addUserProfile =createAsyncThunk('/api/user', async(data) => {
  try {
    const response = await axios.post('http://localhost:3000/api/users', data)
    return data
  } catch(err){
    console.log(err)
  }
})


export const updateUserProfile = createAsyncThunk('user/updateUserProfile', async ({ userId, updatedData }, thunkAPI) => {
  try {
    const response = await axios.put(`/api/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
      .addCase(addUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profile = action.payload;
      })
      .addCase(addUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      });
  },
});

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  usersList: [],
  status: 'idle',
  error: null,
};

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/users`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});


export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (userId, thunkAPI) => {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});

export const addUserProfile =createAsyncThunk('/api/user', async(user) => {
  try {
    const {data} = await axios.post('http://localhost:3000/api/users', user)
    console.log(data)
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
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.usersList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.error;
      })
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

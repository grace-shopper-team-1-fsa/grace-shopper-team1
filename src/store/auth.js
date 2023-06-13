import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {};

export const loginWithToken = createAsyncThunk("loginWithToken", async (_, { rejectWithValue }) => {
  const token = window.localStorage.getItem('token');
  console.log(token);
  if(token){
    const response = await axios.get('/api/auth', null,{
      headers: {
        authorization: token
      }
    });
    const userData = response.data;
    const userWithPermissions = {
      ...userData,
      permissions: userData.permissions,
    };
    return userWithPermissions;
  }
  else {
    console.log('in else')
    return rejectWithValue();
  }
});

export const attemptLogin = createAsyncThunk(
  "attemptLogin",
  async (cred, { rejectWithValue }) => {
    try {
      let response = await axios.post("/api/auth", cred);
      window.localStorage.setItem("token", response.data);
      response = await axios.get("/api/auth", {
        headers: {
          authorization: response.data,
        },
      });

      const userData = response.data;

      const userWithPermissions = {
        ...userData,
        permissions: userData.permissions,
      };

      return userWithPermissions;
    } catch (ex) {
      return rejectWithValue(ex.response.data);
    }
  }
);

const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout: (state)=>{
      window.localStorage.removeItem('token');
      return {};
    }
  },
  extraReducers: (builder)=>{
    builder.addCase(loginWithToken.fulfilled, (state, action)=>{
      return action.payload;
    })
    builder.addCase(attemptLogin.fulfilled, (state, action)=>{
      return action.payload;
    })
  }
});
const { logout } = authSlice.actions;

export { logout };

export default authSlice.reducer;

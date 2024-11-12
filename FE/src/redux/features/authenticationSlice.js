import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const register = createAsyncThunk(
  "auth/register",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.register(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    register: [],
    login: [],
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.register = [];
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.register = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authenticationSlice.reducer;

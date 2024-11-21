import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getRateInRestaurant = createAsyncThunk(
  "/rate",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getRateInRestaurant(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const rateSlice = createSlice({
  name: "rate",
  initialState: {
    rate: [],
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRateInRestaurant.pending, (state) => {
        state.loading = true;
        state.rate = [];
      })
      .addCase(getRateInRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.rate = action.payload;
      })
      .addCase(getRateInRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default rateSlice.reducer;

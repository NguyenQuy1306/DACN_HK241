import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createOrder = createAsyncThunk(
  "/order",
  async ({ request, totalAmount, deposit }, { rejectWithValue }) => {
    try {
      console.log("totalAmounttotalAmount", totalAmount);
      const response = await api.createOrder({ request, totalAmount, deposit });

      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.order = [];
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;

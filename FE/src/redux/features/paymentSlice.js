import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentStatus: "",
    error: "",
    loading: false,
  },
  reducers: {
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getRateInRestaurant.pending, (state) => {
  //         state.loading = true;
  //         state.rate = [];
  //       })
  //       .addCase(getRateInRestaurant.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.rate = action.payload;
  //       })
  //       .addCase(getRateInRestaurant.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       });
  //   },
});
export const paymentStatus = (state) => state.payment.paymentStatus;
export const { setPaymentStatus } = paymentSlice.setPaymentStatus;
export default paymentSlice.reducer;

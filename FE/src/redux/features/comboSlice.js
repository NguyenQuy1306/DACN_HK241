import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getComboAvailable = createAsyncThunk(
  "/combo",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getComboAvailable(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const comboSlice = createSlice({
  name: "combo",
  initialState: {
    combo: [],
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getComboAvailable.pending, (state) => {
        state.loading = true;
        state.combo = [];
      })
      .addCase(getComboAvailable.fulfilled, (state, action) => {
        state.loading = false;
        state.combo = action.payload;
      })
      .addCase(getComboAvailable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default comboSlice.reducer;

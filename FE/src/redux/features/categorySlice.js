import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllCategory = createAsyncThunk(
  "/categorySlice",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getAllCategory(params);
      console.log("response", response);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: null,
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.loading = true;
        state.category = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
// export const comboType = (state) => state.combo.comboType;
// export const { setComboType } = comboSlice.actions;
export default categorySlice.reducer;

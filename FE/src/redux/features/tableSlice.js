import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getTableForRestaurant = createAsyncThunk(
  "/table/restaurant",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getTableForRestaurant(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    choosedTable: null,
    error: "",
    loading: false,
  },

  reducers: {
    setChoosedTable(state, action) {
      const { choosedTable } = action.payload;
      state.choosedTable = choosedTable;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTableForRestaurant.pending, (state) => {
        state.loading = true;
        state.tables = [];
      })
      .addCase(getTableForRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(getTableForRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setChoosedTable } = tableSlice.actions;
export default tableSlice.reducer;

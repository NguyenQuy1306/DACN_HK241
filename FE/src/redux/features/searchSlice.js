import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    openModalSearch2: false,
    openModalSearch1: false,
    error: "",
    loading: false,
  },

  reducers: {
    handleModal(state, action) {
      const { openModalSearch2 } = action.payload;
      state.openModalSearch2 = openModalSearch2;
    },
    handleModal1(state, action) {
      const { openModalSearch1 } = action.payload;
      state.openModalSearch1 = openModalSearch1;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(getTableForRestaurant.pending, (state) => {
  //         state.loading = true;
  //         state.tables = [];
  //       })
  //       .addCase(getTableForRestaurant.fulfilled, (state, action) => {
  //         state.loading = false;
  //         state.tables = action.payload;
  //       })
  //       .addCase(getTableForRestaurant.rejected, (state, action) => {
  //         state.loading = false;
  //         state.error = action.payload;
  //       });
  //   },
});
export const { handleModal, handleModal1 } = searchSlice.actions;
export const openModalSearch2 = (state) => state.search.openModalSearch2;
export const openModalSearch1 = (state) => state.search.openModalSearch1;

export default searchSlice.reducer;

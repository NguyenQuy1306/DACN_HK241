import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { create } from "@mui/material/styles/createTransitions";

export const searchKeyword = createAsyncThunk(
  "/search/keyword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getKeywords(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchWithKeyword = createAsyncThunk(
  "/search/withKeyword",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.searchByKeyword(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchSlice = createSlice({
  name: "search",
  initialState: {
    search: [],
    openModalSearch2: false,
    openModalSearch1: false,
    keyword: [],
    restaurantsSearch: [],
    restaurantSearchContinuous: [],
    paramKeyword: "",
    paramKeywordSearch: "",
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
    saveKeyword(state, action) {
      state.paramKeyword = action.payload;
    },
    saveParamKeywordSearch(state, action) {
      state.paramKeywordSearch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchKeyword.pending, (state) => {
        state.loading = true;
        state.keyword = [];
      })
      .addCase(searchKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.keyword = action.payload;
      })
      .addCase(searchKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchWithKeyword.pending, (state) => {
        state.loading = true;
        state.restaurantsSearch = [];
      })
      .addCase(searchWithKeyword.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantsSearch = action.payload;
      })
      .addCase(searchWithKeyword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  handleModal,
  handleModal1,
  saveKeyword,
  saveParamKeywordSearch,
} = searchSlice.actions;
export const openModalSearch2 = (state) => state.search.openModalSearch2;
export const openModalSearch1 = (state) => state.search.openModalSearch1;
export const paramKeyword = (state) => state.search.paramKeyword;

export default searchSlice.reducer;

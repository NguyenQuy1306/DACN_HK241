import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getFood = createAsyncThunk(
  "/food",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getFood(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFood = createAsyncThunk(
  "/createfood",
  async (
    { restaurantId, categoryId, foodRequest, file },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createFood({
        restaurantId,
        categoryId,
        foodRequest,
        file,
      });
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const foodSlice = createSlice({
  name: "food",
  initialState: {
    food: [],
    responseCreateFood: null,
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFood.pending, (state) => {
        state.loading = true;
        state.food = [];
      })
      .addCase(getFood.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload;
      })
      .addCase(getFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createFood.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.loading = false;
        state.responseCreateFood = action.payload;
      })
      .addCase(createFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default foodSlice.reducer;

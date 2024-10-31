import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getRestaurants = createAsyncThunk(
  "/restaurants",
  async ({ rejectWithValue }) => {
    try {
      const response = await api.getRestaurants();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRestaurantsInMaps = createAsyncThunk(
  "/restaurants/list-in-boundary",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getRestaurantsInMaps(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: {
    restaurants: [],
    restaurantsImages: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantsInMaps.pending, (state) => {
        state.loading = true;
        state.restaurants = [];
      })
      .addCase(getRestaurantsInMaps.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurantsInMaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default restaurantSlice.reducer;

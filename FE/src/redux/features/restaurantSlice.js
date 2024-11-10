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
    openBookingWithMenu: false,
    menuChoosed: [],
    newMenu: [],
    hoveredMarkerIndex: null,
  },
  reducers: {
    setOpenBookingWithMenu: (state, action) => {
      const { openBookingWithMenu, menuChoosed, newMenu } = action.payload;
      state.openBookingWithMenu = openBookingWithMenu;
      state.menuChoosed = menuChoosed || [];
      state.newMenu = newMenu || [];
    },
    setHoveredMarkerIndex: (state, action) => {
      state.hoveredMarkerIndex = action.payload;
    },
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
export const { setOpenBookingWithMenu, setHoveredMarkerIndex } =
  restaurantSlice.actions;

export default restaurantSlice.reducer;

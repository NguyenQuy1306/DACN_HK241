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
      console.log("-params", params);

      const response = await api.getRestaurantsInMaps(params);
      return response;
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
    bounds: null,
    error: "",
    loading: false,
    openBookingWithMenu: false,
    menuChoosed: [],
    newMenu: [],
    currentPage: 0,
    metadata: null,
    bookingWithNewCombo: false,
    hoveredMarkerIndex: null,
  },
  reducers: {
    setOpenBookingWithMenu: (state, action) => {
      const { openBookingWithMenu, menuChoosed, newMenu, bookingWithNewCombo } =
        action.payload;
      state.openBookingWithMenu = openBookingWithMenu;
      state.menuChoosed = menuChoosed || [];
      state.newMenu = newMenu || [];
      state.bookingWithNewCombo = bookingWithNewCombo;
    },
    setHoveredMarkerIndex: (state, action) => {
      state.hoveredMarkerIndex = action.payload;
    },
    saveBounds: (state, action) => {
      state.bounds = action.payload;
    },
    saveCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantsInMaps.pending, (state) => {
        state.loading = true;
        state.restaurants = [];
        state.metadata = null;
      })
      .addCase(getRestaurantsInMaps.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.payload;
        state.metadata = action.payload.metadata.pagination;
      })
      .addCase(getRestaurantsInMaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const {
  setOpenBookingWithMenu,
  setHoveredMarkerIndex,
  saveBounds,
  saveCurrentPage,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

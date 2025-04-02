import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllRestaurants = createAsyncThunk("/restaurants", async (_, { rejectWithValue }) => {
    try {
        const response = await api.getAllRestaurant();
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const adminSlice = createSlice({
    name: "admin",
    initialState: {
        restaurants: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllRestaurants.pending, (state) => {
                state.loading = true;
                state.restaurants = [];
            })
            .addCase(getAllRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                console.log("Restaurants DATA FROM SERVER: ", action.payload);
                state.restaurants = action.payload;
            })
            .addCase(getAllRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default adminSlice.reducer;

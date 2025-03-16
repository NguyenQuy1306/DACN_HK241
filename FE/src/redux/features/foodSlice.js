import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getFood = createAsyncThunk("/food", async (params, { rejectWithValue }) => {
    try {
        alert("Getting food...");
        const response = await api.getFood(params);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const foodSlice = createSlice({
    name: "food",
    initialState: {
        food: [],
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
            });
    },
});

export default foodSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { getAllOrdersByRestaurantId } from "./orderSlice";

export const createOrder = createAsyncThunk(
    "/order",
    async ({ request, totalAmount, deposit }, { rejectWithValue }) => {
        try {
            console.log("totalAmounttotalAmount", totalAmount);
            const response = await api.createOrder({ request, totalAmount, deposit });

            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
export const getAllOrders = createAsyncThunk("/order/all", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getAllOrders(params);
        console.log("DATA ORDER LIST FROM SERVER: ", response);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getAllOrderByRestaurantId = createAsyncThunk(
    "/order/all/restaurant",
    async ({ restaurantId }, { rejectWithValue }) => {
        try {
            const response = await api.getOrdersByRestaurantId({ restaurantId });
            console.log("DATA ORDER LIST FROM SERVER: ", response);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        order: [],
        error: "",
        loading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
                state.order = [];
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.loading = true;
                state.order = [];
            })
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getAllOrderByRestaurantId.pending, (state) => {
                state.loading = true;
                state.order = [];
            })
            .addCase(getAllOrderByRestaurantId.fulfilled, (state, action) => {
                state.loading = false;

                state.order = action.payload;
            })
            .addCase(getAllOrderByRestaurantId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default orderSlice.reducer;

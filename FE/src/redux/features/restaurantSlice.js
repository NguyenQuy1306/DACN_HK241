import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { create } from "@mui/material/styles/createTransitions";
import { getRestaurantById } from "./../../api/travelAdvisorAPI";

export const getRestaurants = createAsyncThunk("/restaurants", async ({ rejectWithValue }) => {
    try {
        const response = await api.updateRestaurantInfor();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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
    },
);
export const getRestaurant = createAsyncThunk("/restaurant", async (params, { rejectWithValue }) => {
    try {
        console.log("-params", params);

        const response = await api.getRestaurantByOwnerId(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getRestaurantId = createAsyncThunk("/restaurant/id", async (params, { rejectWithValue }) => {
    try {
        console.log("-params", params);

        const response = await api.getRestaurantById(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getRestaurantByOwnerId = createAsyncThunk("/restaurants/owner", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getRestaurantByOwnerId(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateRestaurantInfor = createAsyncThunk("/restaurants/update", async (params, { rejectWithValue }) => {
    try {
        const response = await api.updateRestaurantInfor(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

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
        restaurantOwnerByAdmin: null,
        newMenu: [],
        currentPage: 0,
        updateRestaurantResponse: null,
        selectedRestaurant: null,
        thanhPho: "TP Hồ Chí Minh",
        time: null,
        date: null,
        people: null,
        metadata: null,
        bookingWithNewCombo: false,
        hoveredMarkerIndex: null,
    },

    reducers: {
        setOpenBookingWithMenu: (state, action) => {
            const { openBookingWithMenu, menuChoosed, newMenu, bookingWithNewCombo } = action.payload;
            state.openBookingWithMenu = openBookingWithMenu;
            state.menuChoosed = menuChoosed || [];
            state.newMenu = newMenu || [];
            state.bookingWithNewCombo = bookingWithNewCombo;
        },
        saveThanhPho: (state, action) => {
            state.thanhPho = action.payload;
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
        saveFilterTable: (state, action) => {
            const { time, date, people } = action.payload;
            state.time = time;
            state.date = date;
            state.people = people;
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
            })
            .addCase(getRestaurantByOwnerId.pending, (state) => {
                state.loading = true;
                state.restaurantOwnerByAdmin = [];
            })
            .addCase(getRestaurantByOwnerId.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurantOwnerByAdmin = action.payload.payload;
            })
            .addCase(getRestaurantByOwnerId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateRestaurantInfor.pending, (state) => {
                state.loading = true;
                state.updateRestaurantResponse = [];
            })
            .addCase(updateRestaurantInfor.fulfilled, (state, action) => {
                state.loading = false;
                state.updateRestaurantInfor = action.payload.payload;
            })
            .addCase(updateRestaurantInfor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getRestaurantId.pending, (state) => {
                state.loading = true;
                state.selectedRestaurant = null;
            })
            .addCase(getRestaurantId.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRestaurant = action.payload.payload;
            })
            .addCase(getRestaurantId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const {
    setOpenBookingWithMenu,
    setHoveredMarkerIndex,
    saveBounds,
    saveThanhPho,
    saveCurrentPage,
    saveFilterTable,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;

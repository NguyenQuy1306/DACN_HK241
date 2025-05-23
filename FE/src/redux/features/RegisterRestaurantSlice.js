import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    restaurantName: "",
    restaurantAddress: "",
    avgPrice: "",
};

const registerRestaurantSlice = createSlice({
    name: "restaurantRegister",
    initialState: initialState,
    reducers: {
        setLastName: (state, action) => {
            state.lname = action.payload;
        },
        setFirstName: (state, action) => {
            state.fname = action.payload;
        },
        setPhone: (state, action) => {
            state.phone = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setRestaurantName: (state, action) => {
            state.restaurantName = action.payload;
        },
        setRestaurantAddress: (state, action) => {
            state.restaurantAddress = action.payload;
        },
        setAvgPrice: (state, action) => {
            state.avgPrice = action.payload;
        },
        resetState: () => initialState,
    },
});

export const {
    setFirstName,
    setRestaurantName,
    resetState,
    setRestaurantAddress,
    setLastName,
    setEmail,
    setPhone,
    setAvgPrice,
} = registerRestaurantSlice.actions;
export default registerRestaurantSlice.reducer;

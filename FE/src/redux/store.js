import { configureStore } from "@reduxjs/toolkit";
import restaurantRegisterReducer from "./features/RegisterRestaurantSlice";

import restaurantSlice from "./features/restaurantSlice";
export default configureStore({
    reducer: {
        restaurant: restaurantSlice,
        restaurantRegister: restaurantRegisterReducer,
    },
});

export const host = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

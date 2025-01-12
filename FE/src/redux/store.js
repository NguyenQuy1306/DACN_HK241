import { configureStore } from "@reduxjs/toolkit";
import restaurantRegisterReducer from "./features/RegisterRestaurantSlice";

import restaurantSlice from "./features/restaurantSlice";
import foodSlice from "./features/foodSlice";
import comboSlice from "./features/comboSlice";
import tableSlice from "./features/tableSlice";
import authenticationSlice from "./features/authenticationSlice";
import orderSlice from "./features/orderSlice";
import rateSlice from "./features/rateSlice";
import navigationSlice from "./features/navigationSlice";
import searchSlice from "./features/searchSlice";
export default configureStore({
  reducer: {
    restaurant: restaurantSlice,
    food: foodSlice,
    combo: comboSlice,
    table: tableSlice,
    restaurantRegister: restaurantRegisterReducer,
    authentication: authenticationSlice,
    order: orderSlice,
    rate: rateSlice,
    navigation: navigationSlice,
    search: searchSlice,
  },
});

export const host = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

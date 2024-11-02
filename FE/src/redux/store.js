import { configureStore } from "@reduxjs/toolkit";

import restaurantSlice from "./features/restaurantSlice";
import foodSlice from "./features/foodSlice";
export default configureStore({
  reducer: {
    restaurant: restaurantSlice,
    food: foodSlice,
  },
});

export const host = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

import { configureStore } from "@reduxjs/toolkit";

import restaurantSlice from "./features/restaurantSlice";
import foodSlice from "./features/foodSlice";
import comboSlice from "./features/comboSlice";
import tableSlice from "./features/tableSlice";
export default configureStore({
  reducer: {
    restaurant: restaurantSlice,
    food: foodSlice,
    combo: comboSlice,
    table: tableSlice,
  },
});

export const host = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

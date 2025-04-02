import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import reducers
import restaurantRegisterReducer from "./features/RegisterRestaurantSlice";
import restaurantSlice from "./features/restaurantSlice";
import foodSlice from "./features/foodSlice";
import comboSlice from "./features/comboSlice";
import tableSlice from "./features/tableSlice";
import authenticateSlice from "./features/authenticationSlice";
import orderSlice from "./features/orderSlice";
import rateSlice from "./features/rateSlice";
import navigationSlice from "./features/navigationSlice";
import searchSlice from "./features/searchSlice";
import paymentSlice from "./features/paymentSlice";
import persistSlice from "./features/persistSlice";
import categorySlice from "./features/categorySlice";
import adminSlice from "./features/adminSlice";
// Authentication persist config
const authPersistConfig = {
    key: "authentication",
    storage,
};

// Create persisted authentication reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authenticateSlice);

// Search persist config
const searchPersistConfig = {
    key: "search",
    storage,
};

// Create persisted search reducer
const persistedSearchReducer = persistReducer(searchPersistConfig, persistSlice);

export const store = configureStore({
    reducer: {
        restaurant: restaurantSlice,
        food: foodSlice,
        combo: comboSlice,
        table: tableSlice,
        restaurantRegister: restaurantRegisterReducer,
        authentication: persistedAuthReducer,
        order: orderSlice,
        rate: rateSlice,
        navigation: navigationSlice,
        search: searchSlice,
        payment: paymentSlice,
        persist: persistedSearchReducer,
        category: categorySlice,
        admin: adminSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export const host = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

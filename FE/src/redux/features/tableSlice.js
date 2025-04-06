import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getTableForRestaurant = createAsyncThunk(
  "/table/restaurant",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getTableForRestaurant(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getTableForRestaurantByOwner = createAsyncThunk(
  "/table/restaurantOwner",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getTableForRestaurantByOwner(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createTableForRestaurant = createAsyncThunk(
  "/table/createrestaurant",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.createTableForRestaurant(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTableForRestaurant = createAsyncThunk(
  "/table/deleteTable",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.deleteTableForRestaurant(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCountOfTable = createAsyncThunk(
  "/table/updateCountTable",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.updateCountOfTable(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState: {
    tables: [],
    tablesOwner: null,
    choosedTable: null,
    deleteTableResposne: null,
    openModalPayment: false,
    tableCreateResponse: null,
    error: "",
    loading: false,
  },

  reducers: {
    setChoosedTable(state, action) {
      const { choosedTable } = action.payload;
      state.choosedTable = choosedTable;
    },
    setOpenModalPayment(state, action) {
      state.openModalPayment = action.payload;
    },
    setDeleteTableResposne(state, action) {
      state.deleteTableResposne = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTableForRestaurant.pending, (state) => {
        state.loading = true;
        state.tables = [];
      })
      .addCase(getTableForRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(getTableForRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getTableForRestaurantByOwner.pending, (state) => {
        state.loading = true;
        state.tablesOwner = [];
      })
      .addCase(getTableForRestaurantByOwner.fulfilled, (state, action) => {
        state.loading = false;
        state.tablesOwner = action.payload;
      })
      .addCase(getTableForRestaurantByOwner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createTableForRestaurant.pending, (state) => {
        state.loading = true;
        state.tableCreateResponse = [];
      })
      .addCase(createTableForRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.tableCreateResponse = action.payload;
      })
      .addCase(createTableForRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteTableForRestaurant.pending, (state) => {
        state.loading = true;
        state.deleteTableResposne = null;
      })
      .addCase(deleteTableForRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.deleteTableResposne = action.meta.requestStatus;
      })
      .addCase(deleteTableForRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const openModalPayment = (state) => state.table.openModalPayment;
export const { setChoosedTable, setOpenModalPayment, setDeleteTableResposne } =
  tableSlice.actions;

export default tableSlice.reducer;

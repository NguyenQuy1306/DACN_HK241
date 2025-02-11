import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getComboAvailable = createAsyncThunk(
  "/combo",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getComboAvailable(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createComboByUser = createAsyncThunk(
  "/createCombo",
  async (params, { rejectWithValue }) => {
    try {
      console.log("params createComboByusaer:L ", params);
      const response = await api.createComboByUser(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const comboSlice = createSlice({
  name: "combo",
  initialState: {
    combo: [],
    comboCreateReponse: [],
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getComboAvailable.pending, (state) => {
        state.loading = true;
        state.combo = [];
      })
      .addCase(getComboAvailable.fulfilled, (state, action) => {
        state.loading = false;
        state.combo = action.payload;
      })
      .addCase(getComboAvailable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createComboByUser.pending, (state) => {
        state.loading = true;
        state.comboCreateReponse = [];
      })
      .addCase(createComboByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.comboCreateReponse = action.payload;
      })
      .addCase(createComboByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default comboSlice.reducer;

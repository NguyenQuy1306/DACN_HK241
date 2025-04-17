import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import { getAllOrdersByRestaurantId } from "./orderSlice";

export const getOverbookingSettings = createAsyncThunk(
  "/overbooking/settings",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getOverbookingSettings(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeThreshold = createAsyncThunk(
  "/removeThreshold",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.removeThreshold(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addThreshold = createAsyncThunk(
  "/addThreshold",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.addThreshold(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateThreshold = createAsyncThunk(
  "/updateThreshold",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.updateThreshold(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const saveSettings = createAsyncThunk(
  "/saveSettings",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.saveSettings(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOverrides = createAsyncThunk(
  "/overrides/update",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.updateOverrides(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOverrides = createAsyncThunk(
  "/overrides/create",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.createOverrides(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOverrides = createAsyncThunk(
  "/overrides/delete",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.deleteOverrides(params);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const overbookingSlice = createSlice({
  name: "overbooking",
  initialState: {
    overbookingSettings: null,
    thresholdResponse: null,
    timeOveridingResponse: null,
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOverbookingSettings.pending, (state) => {
        state.loading = true;
        state.overbookingSettings = null;
      })
      .addCase(getOverbookingSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.overbookingSettings = action.payload;
      })
      .addCase(getOverbookingSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD THRESHOLD
      .addCase(addThreshold.pending, (state) => {
        state.loading = true;
      })
      .addCase(addThreshold.fulfilled, (state, action) => {
        state.loading = false;
        state.thresholdResponse = action.payload;
      })
      .addCase(addThreshold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // REMOVE THRESHOLD
      .addCase(removeThreshold.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeThreshold.fulfilled, (state, action) => {
        state.loading = false;
        state.thresholdResponse = action.payload;
      })
      .addCase(removeThreshold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE THRESHOLD
      .addCase(updateThreshold.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateThreshold.fulfilled, (state, action) => {
        state.loading = false;
        state.thresholdResponse = action.payload;
      })
      .addCase(updateThreshold.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // SAVE SETTINGS
      .addCase(saveSettings.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.overbookingSettings = action.payload;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE OVERRIDES
      .addCase(createOverrides.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOverrides.fulfilled, (state, action) => {
        state.loading = false;
        state.timeOveridingResponse = action.payload;
      })
      .addCase(createOverrides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE OVERRIDES
      .addCase(updateOverrides.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOverrides.fulfilled, (state, action) => {
        state.loading = false;
        state.timeOveridingResponse = action.payload;
      })
      .addCase(updateOverrides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE OVERRIDES
      .addCase(deleteOverrides.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOverrides.fulfilled, (state, action) => {
        state.loading = false;
        state.timeOveridingResponse = action.payload;
      })
      .addCase(deleteOverrides.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default overbookingSlice.reducer;

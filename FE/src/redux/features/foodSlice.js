import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getFood = createAsyncThunk(
  "/food",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.getFood(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFoodById = createAsyncThunk(
  "/food/id",
  async ({ restaurantId, foodId }, { rejectWithValue }) => {
    try {
      const response = await api.getFoodById(restaurantId, foodId);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFoodByCategory = createAsyncThunk(
  "/food/category",
  async ({ restaurantId, categoryId }, { rejectWithValue }) => {
    try {
      const response = await api.getFoodByCategory({
        restaurantId,
        categoryId,
      });
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createFood = createAsyncThunk(
  "/createfood",
  async (
    { restaurantId, categoryId, foodRequest, file },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.createFood({
        restaurantId,
        categoryId,
        foodRequest,
        file,
      });
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteFood = createAsyncThunk(
  "/deleteFood",
  async ({ restaurantId, foodId }, { rejectWithValue }) => {
    try {
      const response = await api.deleteFood({ restaurantId, foodId });
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchFood = createAsyncThunk(
  "/searchFood",
  async ({ key, restaurantId }, { rejectWithValue }) => {
    try {
      const response = await api.searchFood({ key, restaurantId });
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const duplicateFood = createAsyncThunk(
  "/duplicateFood",
  async ({ restaurantId, foodId }, { rejectWithValue }) => {
    try {
      const response = await api.duplicateFood({ restaurantId, foodId });
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFood = createAsyncThunk(
  "/updateFood",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.updateFood(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const foodSlice = createSlice({
  name: "food",
  initialState: {
    food: [],
    responseCreateFood: null,
    error: "",
    loading: false,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFood.pending, (state) => {
        state.loading = true;
        state.food = [];
      })
      .addCase(getFood.fulfilled, (state, action) => {
        state.loading = false;
        let foodResult = [];
        foodResult = action.payload.reduce(
          (acc, cur) => [...acc, ...cur.foodResponses],
          []
        );
        state.food = foodResult;
      })
      .addCase(getFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createFood.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(createFood.fulfilled, (state, action) => {
        state.loading = false;
        state.responseCreateFood = action.payload;
      })
      .addCase(createFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteFood.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(deleteFood.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload[0]?.foodResponses;
      })
      .addCase(deleteFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(duplicateFood.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(duplicateFood.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload[0]?.foodResponses;
      })
      .addCase(duplicateFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchFood.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(searchFood.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload[0]?.foodResponses;
      })
      .addCase(searchFood.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getFoodByCategory.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(getFoodByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload[0]?.foodResponses;
      })
      .addCase(getFoodByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getFoodById.pending, (state) => {
        state.loading = true;
        state.responseCreateFood = null;
      })
      .addCase(getFoodById.fulfilled, (state, action) => {
        state.loading = false;
        state.food = action.payload;
      })
      .addCase(getFoodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { saveFoodDetail } = foodSlice.actions;
export default foodSlice.reducer;

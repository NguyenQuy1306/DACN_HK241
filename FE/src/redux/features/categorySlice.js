import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getAllCategory = createAsyncThunk("/categorySlice", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getAllCategory(params);
        console.log("response", response);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createCategory = createAsyncThunk("/addCategory", async ({ restaurantId }, { rejectWithValue }) => {
    try {
        const response = await api.createCategory({ restaurantId });
        console.log("response", response);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteCategory = createAsyncThunk("/deleteCategory", async (params, { rejectWithValue }) => {
    try {
        const response = await api.deleteCategory(params);
        console.log("response", response);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const searchCategory = createAsyncThunk("/searchCategory", async (params, { rejectWithValue }) => {
    try {
        const response = await api.searchCategory(params);
        console.log("response", response);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const updateCategory = createAsyncThunk(
    "/updateCategory",
    async ({ categoryId, params }, { rejectWithValue }) => {
        try {
            const response = await api.updateCategory(categoryId, params);
            console.log("response", response);
            return response.payload;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        category: null,
        error: "",
        loading: false,
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllCategory.pending, (state) => {
                state.loading = true;
                state.category = null;
            })
            .addCase(getAllCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(getAllCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.category = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.category = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(searchCategory.pending, (state) => {
                state.loading = true;
                state.category = null;
            })
            .addCase(searchCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(searchCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.category = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
// export const comboType = (state) => state.combo.comboType;
// export const { setComboType } = comboSlice.actions;
export default categorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const checkSession = createAsyncThunk(
  "auth/checkSession",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.checkSession();
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Session check failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.register(params);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.login(params);
      return response.payload;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.logout();
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    registerStatus: "",
    error: null,
    errorCheckSession: null,
    errorRegister: null,
    loading: false,
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearRegisterStatus(state) {
      state.registerStatus = "";
    },
    clearLoglin(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.errorRegister = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.registerStatus = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.errorRegister = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check Session
      .addCase(checkSession.pending, (state) => {
        state.loading = true;
        state.errorCheckSession = null;
      })
      .addCase(checkSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkSession.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.errorCheckSession = action.payload;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearError, clearRegisterStatus, clearLoglin } =
  authenticationSlice.actions;

export const selectUser = (state) => state.authentication.user;
export const selectLoading = (state) => state.authentication.loading;
export const selectError = (state) => state.authentication.error;

export default authenticationSlice.reducer;

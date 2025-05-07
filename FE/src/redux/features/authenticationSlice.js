import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const checkSession = createAsyncThunk("auth/checkSession", async (_, { rejectWithValue }) => {
    try {
        const response = await api.checkSession();
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Session check failed");
    }
});

export const register = createAsyncThunk("auth/register", async (params, { rejectWithValue }) => {
    try {
        const response = await api.register(params);
        return response.status;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Registration failed");
    }
});

export const login = createAsyncThunk("auth/login", async (params, { rejectWithValue }) => {
    try {
        const response = await api.login(params);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await api.logoutAPI();
        return true;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Logout failed");
    }
});
export const getRestaurantByOwnerId = createAsyncThunk("/restaurants/owner", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getRestaurantByOwnerId(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const loginWithGoogle = createAsyncThunk("/oauth2/google", async (params, { rejectWithValue }) => {
    try {
        const response = await api.loginWithGoogle(params);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

export const fetchUser = createAsyncThunk("/customer/information", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getUserInfo(params);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Login failed");
    }
});

const authenticationSlice = createSlice({
    name: "authentication",
    initialState: {
        user: null,
        userRole: "guest",
        registerStatus: "",
        oath2Callback: null,
        restaurantOwner: null,
        openModal: false,
        error: null,
        ownerLogin: false,
        adminLogin: false,
        errorCheckSession: null,
        isAuthenticated: false,
        errorRegister: null,
        loading: false,
    },

    reducers: {
        setLoginRoute: (state, action) => {
            state.ownerLogin = action.payload;
        },
        setAdminLogin: (state, action) => {
            state.adminLogin = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            console.log("action.payload", action.payload);
            state.isAuthenticated = true;
            // state.userRole=action.payload.
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        clearError(state) {
            state.error = null;
        },
        clearRegisterStatus(state) {
            state.registerStatus = "";
        },
        clearLogin(state) {
            state.user = null;
        },
        setStatusModalAuthentication(state, action) {
            const { openModal } = action.payload;
            state.openModal = openModal;
        },
    },
    extraReducers: (builder) => {
        builder
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
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload;
                switch (action.payload.userRole) {
                    case "C":
                        state.userRole = "customer";
                        break;
                    case "O":
                        state.userRole = "owner";
                        state.ownerLogin = true;
                        break;
                    case "A":
                        state.userRole = "admin";
                        state.adminLogin = true;
                        break;
                    default:
                        state.userRole = "guest"; // Hoặc một giá trị mặc định nếu không xác định được role
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
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
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.userRole = "guest";
                state.ownerLogin = false;
                state.adminLogin = false;
                state.restaurantOwner = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload;
            })

            .addCase(getRestaurantByOwnerId.pending, (state) => {
                state.loading = true;
                state.restaurantOwner = [];
            })
            .addCase(getRestaurantByOwnerId.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurantOwner = action.payload.payload;
            })
            .addCase(getRestaurantByOwnerId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginWithGoogle.pending, (state) => {
                state.loading = true;
                state.oath2Callback = [];
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.loading = false;
                state.oath2Callback = action.payload.payload;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    clearError,
    clearRegisterStatus,
    clearLogin,
    setLoginRoute,
    setUser,
    setUserRole,
    setStatusModalAuthentication,
    setAdminLogin,
} = authenticationSlice.actions;

export const selectUser = (state) => state.authentication.user;
export const selectLoading = (state) => state.authentication.loading;
export const selectError = (state) => state.authentication.error;

export default authenticationSlice.reducer;

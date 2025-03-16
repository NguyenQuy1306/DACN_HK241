import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../api";


export const createPaymentLink = createAsyncThunk(
    "/payment/create-payment-link",
    async ({ deposit, request, RETURN_URL }, { rejectWithValue }) => {
        try {
            const response = await api.createPaymentLink({
                deposit,
                request,
                RETURN_URL,
            });
            return response;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const getOrder = createAsyncThunk("/payment/getOrder", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getOrder(params);
        console.log("ayment/getOrd", response);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const cancelOrder = createAsyncThunk("/payment/cancelOrder", async (params, { rejectWithValue }) => {
    try {
        const response = await api.cancelOrder(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const paymentCallback = createAsyncThunk("/payment/paymentCallback", async (params, { rejectWithValue }) => {
    
    try {
        const response = await api.paymentCallback(params);
        return response;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getDepositPolicy = createAsyncThunk("/payments/deposit", async (params, { rejectWithValue }) => {
    try {
        const response = await api.getDepositPolicy(params);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const createPayment = createAsyncThunk("/payments/payment", async (params, { rejectWithValue }) => {
    try {
        const response = await api.createPayment(params);
        return response.payload;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        paymentStatus: "",
        createPaymentLink: [],
        getOrder: null,
        cancelOrder: [],
        paymentCallback: null,
        depositPolicy: null,
        deposit: 0,
        paymentAmount: 0,
        amount: 0,
        error: "",
        loading: false,
    },
    reducers: {
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        saveDeposit: (state, action) => {
            state.deposit = action.payload;
        },
        saveAmount: (state, action) => {
            state.amount = action.payload;
        },
        savePaymentAmount: (state, action) => {
            state.paymentAmount = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPaymentLink.pending, (state) => {
                state.loading = true;
                state.createPaymentLink = [];
            })
            .addCase(createPaymentLink.fulfilled, (state, action) => {
                state.loading = false;
                state.createPaymentLink = action.payload;
            })
            .addCase(createPaymentLink.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getOrder.pending, (state) => {
                state.loading = true;
                state.getOrder = [];
            })
            .addCase(getOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.getOrder = action.payload;
            })
            .addCase(getOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(cancelOrder.pending, (state) => {
                state.loading = true;
                state.cancelOrder = [];
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.cancelOrder = action.payload;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(paymentCallback.pending, (state) => {
                state.loading = true;
                state.paymentCallback = [];
            })
            .addCase(paymentCallback.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentCallback = action.payload;
            })
            .addCase(paymentCallback.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getDepositPolicy.pending, (state) => {
                state.loading = true;
                state.depositPolicy = null;
            })
            .addCase(getDepositPolicy.fulfilled, (state, action) => {
                state.loading = false;
                state.depositPolicy = action.payload;
            })
            .addCase(getDepositPolicy.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});
export const paymentStatus = (state) => state.payment.paymentStatus;
export const { setPaymentStatus, saveDeposit, saveAmount, savePaymentAmount } = paymentSlice.actions;
export default paymentSlice.reducer;

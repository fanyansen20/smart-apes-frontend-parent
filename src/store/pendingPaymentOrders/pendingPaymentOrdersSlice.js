import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: [],
  totalPages: 1,
  totalResults: 1,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getPendingPaymentOrder = createAsyncThunk(
  "checkouts/order",
  async ({ page, limit, search, status }, { rejectWithValue }) => {
    try {
      const getStatus = status ? { status } : {};
      const getParamsValue = search ? { search, limit } : { page, limit };
      const params = new URLSearchParams({
        ...getParamsValue,
        ...getStatus,
      });
      const response = await API.get(`/checkouts?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const pendingPaymentOrdersSlice = createSlice({
  name: "pendingPaymentOrders",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPendingPaymentOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPendingPaymentOrder.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { results, totalPages, totalResults } = action.payload;

        state.data = results.map((item) => ({
          ...item,
          order_type: "CHECKOUT",
        }));
        state.totalPages = totalPages;
        state.totalResults = totalResults;
        state.error = null;
      })
      .addCase(getPendingPaymentOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus } = pendingPaymentOrdersSlice.actions;

export default pendingPaymentOrdersSlice.reducer;

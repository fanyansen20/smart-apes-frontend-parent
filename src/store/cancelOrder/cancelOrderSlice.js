import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const POST_URL = (order_id) => `/user-orders/${order_id}/cancel `;

const initialState = {
  data: {},
  currentId: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  error: null,
};

export const cancelOrder = createAsyncThunk(
  "order_id/cancel",
  async ({ order_id, payload }, { rejectWithValue }) => {
    try {
      const response = await API.post(POST_URL(order_id), payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const cancelOrderSlice = createSlice({
  name: "cancelOrder",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(cancelOrder.pending, (state, action) => {
        state.currentId = action.meta.arg?.order_id;
        state.status = "loading";
        state.loading = true;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentId = null;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.status = "failed";
        state.currentId = null;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export const { resetStatus } = cancelOrderSlice.actions;

export default cancelOrderSlice.reducer;

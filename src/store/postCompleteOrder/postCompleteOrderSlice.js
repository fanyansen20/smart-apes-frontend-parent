import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const POST_URL = (order_id) => `/user-orders/${order_id}/complete `;

const initialState = {
  data: {},
  currentId: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  error: null,
};

export const postCompleteOrder = createAsyncThunk(
  "order_id/complete",
  async ({ order_id }, { rejectWithValue }) => {
    try {
      const response = await API.post(POST_URL(order_id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const postCompleteOrderSlice = createSlice({
  name: "postCompleteOrder",
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
      .addCase(postCompleteOrder.pending, (state, action) => {
        state.currentId = action.meta.arg?.order_id;
        state.status = "loading";
        state.loading = true;
      })
      .addCase(postCompleteOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentId = null;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(postCompleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.currentId = null;
        state.error = action?.payload?.message;
        state.loading = false;
      });
  },
});

export const { resetStatus } = postCompleteOrderSlice.actions;

export default postCompleteOrderSlice.reducer;

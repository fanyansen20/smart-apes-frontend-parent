import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const POST_URL = (order_id) => `/user-orders/${order_id}/reviews/products`;

const initialState = {
  data: {},
  currentId: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  error: null,
};

export const reviewRatings = createAsyncThunk(
  "order_id/reviews/products",
  async ({ order_id, payload }, { rejectWithValue }) => {
    try {
      const response = await API.post(POST_URL(order_id), payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const reviewRatingsSlice = createSlice({
  name: "reviewRatings",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(reviewRatings.pending, (state, action) => {
        state.currentId = action.meta.arg?.order_id;
        state.status = "loading";
        state.loading = true;
      })
      .addCase(reviewRatings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentId = null;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(reviewRatings.rejected, (state, action) => {
        state.status = "failed";
        state.currentId = null;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export const { resetStatus } = reviewRatingsSlice.actions;

export default reviewRatingsSlice.reducer;

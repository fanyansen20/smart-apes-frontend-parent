import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const URL = "/checkouts/pending";

const initialState = {
  data: {},
  currentId: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  loading: false,
  error: null,
};

export const cancelCheckout = createAsyncThunk(
  "order_id/cancel",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await API.delete(URL, { data: payload });
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const cancelCheckoutSlice = createSlice({
  name: "cancelCheckout",
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
      .addCase(cancelCheckout.pending, (state, action) => {
        state.currentId = action.meta.arg?.order_id;
        state.status = "loading";
        state.loading = true;
      })
      .addCase(cancelCheckout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentId = null;
        // Add any fetched data to the array
        const results = action.payload;

        state.data = results;
        state.loading = false;
      })
      .addCase(cancelCheckout.rejected, (state, action) => {
        state.status = "failed";
        state.currentId = null;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.loading = false;
      });
  },
});

export const { resetStatus } = cancelCheckoutSlice.actions;

export default cancelCheckoutSlice.reducer;

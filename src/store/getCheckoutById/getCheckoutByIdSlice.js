import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getCheckoutById = createAsyncThunk(
  "user/getCheckoutById",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/checkouts/${orderId}`);
      return response.data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const checkoutByIdSlice = createSlice({
  name: "checkoutById",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
    setCheckoutData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCheckoutById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCheckoutById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getCheckoutById.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus, setCheckoutData } = checkoutByIdSlice.actions;

export default checkoutByIdSlice.reducer;

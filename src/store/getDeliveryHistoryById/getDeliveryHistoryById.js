import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getDeliveryHistoryById = createAsyncThunk(
  "user/getDeliveryHistoryById",
  async ({ orderId, subOrderId }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/user-orders/${orderId}/sub-orders/${subOrderId}/delivery-status`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const deliveryHistoryByIdSlice = createSlice({
  name: "deliveryHistoryById",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
    setDeliveryHistoryData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDeliveryHistoryById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDeliveryHistoryById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getDeliveryHistoryById.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus, setDeliveryHistoryData } =
  deliveryHistoryByIdSlice.actions;

export default deliveryHistoryByIdSlice.reducer;

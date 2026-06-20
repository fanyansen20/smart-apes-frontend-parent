import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getSubOrderById = createAsyncThunk(
  "user/getSubOrderById",
  /**
   *
   * @param {{
   *  orderId:string
   *  subOrderId:string
   * }} props
   * @returns
   */
  async ({ orderId, subOrderId }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/user-orders/${orderId}/sub-orders/${subOrderId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderByIdSlice = createSlice({
  name: "subOrderById",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
    setSubOrderData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSubOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getSubOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus, setSubOrderData } = orderByIdSlice.actions;

export default orderByIdSlice.reducer;

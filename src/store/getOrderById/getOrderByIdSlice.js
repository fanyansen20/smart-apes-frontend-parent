import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getOrderById = createAsyncThunk(
  "user/getOrderById",
  /**
   *
   * @param {{orderId:string}} props
   * @returns
   */
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await API.get(`/user-orders/${orderId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderByIdSlice = createSlice({
  name: "orderById",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = {};
      state.status = "idle";
      state.error = null;
    },
    setOrdersData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus, setOrdersData } = orderByIdSlice.actions;

export default orderByIdSlice.reducer;

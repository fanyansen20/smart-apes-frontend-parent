import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: [],
  totalPages: 1,
  totalPesults: 1,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getOrders = createAsyncThunk(
  "user/getOrders",
  async ({ page, limit, status, search }, { rejectWithValue }) => {
    try {
      const getStatus = status ? { status } : {};
      const getParamsValue = search ? { search, limit } : { page, limit };
      const params = new URLSearchParams({
        ...getStatus,
        ...getParamsValue,
      });
      const response = await API.get(`/user-orders?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
    setOrdersData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { results, totalPages, totalResults } = action.payload;

        state.data = results;
        state.totalPages = totalPages;
        state.totalResults = totalResults;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus, setOrdersData } = orderSlice.actions;

export default orderSlice.reducer;

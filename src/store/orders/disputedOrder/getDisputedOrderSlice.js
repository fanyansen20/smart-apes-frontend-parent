// Redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../../config/api";
import { dateFormatter } from "../../../helper/dateFormat";

const initialState = {
  dataDisputedOrders: [],
  page: 1,
  totalPages: 0,
  totalResults: 0,
  isLoading: true,
  code: false,
  errorMessage: false,
};

export const getDisputedOrders = createAsyncThunk(
  "disputed-orders",
  async ({ page = 1, limit = 10, status }, thunkAPi) => {
    try {
      const {
        user: { userData },
      } = thunkAPi.getState() || {};

      const params = new URLSearchParams();
      if (status) params.append("status", status);
      params.append("buyerId", userData?.id);
      params.append("page", page);
      params.append("limit", limit);

      const { data: result } = await API.get(
        `/disputed-orders?${params.toString()}`
      );

      return result;
    } catch (error) {
      return thunkAPi.rejectWithValue(error);
    }
  }
);

const disputedOrdersSlice = createSlice({
  name: "disputed-orders",
  initialState,
  reducers: {
    handleChangePage: (state, { payload }) => {
      state.page = payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDisputedOrders.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = false;
        state.code = false;
      })
      .addCase(getDisputedOrders.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.code = payload.code;

        const { page, results, totalPages, totalResults } = payload?.data || {};

        const disputeOrdersData = results?.map((order) => ({
          ...order,
          createdAt: dateFormatter({
            date: order?.createdAt,
            formatting: "d MMMM yyyy HH:mm",
          }),
          refundDate: dateFormatter({
            date: order?.createdAt,
          }),
          histories: order?.histories?.map((history) => ({
            ...history,
            createdAt: dateFormatter({
              date: history?.createdAt,
            }),
          })),
        }));

        state.page = page;
        state.totalPages = totalPages;
        state.dataDisputedOrders = disputeOrdersData;
        state.totalResults = totalResults;
      })
      .addCase(getDisputedOrders.rejected, (state, { payload }) => {
        const { data } = payload?.response || {};

        state.isLoading = false;
        state.errorMessage = data?.data?.message;
        state.code = data?.code;
      });
  },
});

export const { handleChangePage } = disputedOrdersSlice.actions;

export default disputedOrdersSlice.reducer;

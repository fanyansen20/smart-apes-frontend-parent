import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: [],
  totalPages: 1,
  totalResults: 1,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const getCheckoutOrders = createAsyncThunk(
  "user/getCheckoutOrders",
  async ({ page, limit, search, type }, { rejectWithValue }) => {
    try {
      const getParamsValue = search ? { search, limit } : { page, limit };
      const params = new URLSearchParams({
        ...getParamsValue,
        type,
      });
      const response = await API.get(`/checkouts/orders?${params}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const checkoutOrdersSlice = createSlice({
  name: "checkoutOrders",
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
      .addCase(getCheckoutOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCheckoutOrders.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { results, totalPages, totalResults } = action.payload;

        state.data = results.map((item) => ({
          ...(item?.data || {}),
          order_type: item?.type,
        }));
        state.totalPages = totalPages;
        state.totalResults = totalResults;
        state.error = null;
      })
      .addCase(getCheckoutOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export const { resetStatus, setOrdersData } = checkoutOrdersSlice.actions;

export default checkoutOrdersSlice.reducer;

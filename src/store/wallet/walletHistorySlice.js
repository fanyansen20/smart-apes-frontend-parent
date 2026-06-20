import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  results: [],
  page: 0,
  limit: 10,
  totalPages: 1,
  totalResults: 0,
  isLoading: false,
};

export const getWalletHistory = createAsyncThunk(
  "wallet/getWalletHistory",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const store = await getState();

      const url = `/users/${store?.user?.userData?.id}/wallets/histories`;

      let params = new URLSearchParams();
      params.append("sort_by", "trans_date:desc");
      params.append("limit", store?.walletHistory?.limit);
      params.append("page", store?.walletHistory?.page + 1);

      const response = await API.get(`${url}?${params}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const walletHistorySlice = createSlice({
  name: "walletHistoryStore",
  initialState,
  reducers: {
    changePageWalletHistory: (state, action) => {
      state.page = action.payload;
    },
    changePerPageWalletHistory: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWalletHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWalletHistory.fulfilled, (state, action) => {
        const { results, page, limit, total_pages, total_results } =
          action.payload;
        state.results = results ?? [];
        state.page = page - 1 ?? 0;
        state.limit = limit ?? 10;
        state.totalPages = total_pages ?? 1;
        state.totalResults = total_results ?? 1;
        state.isLoading = false;
      })
      .addCase(getWalletHistory.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { changePageWalletHistory, changePerPageWalletHistory } =
  walletHistorySlice.actions;

export default walletHistorySlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  id: "",
  balance: 0,
  isLoading: false,
};

export const getWalletBalance = createAsyncThunk(
  "wallet/getWalletBalance",
  async (arg, { getState, rejectWithValue }) => {
    try {
      const store = await getState();

      const url = `/users/${store?.user?.userData?.id}/wallets`;

      const response = await API.get(url);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const walletBalanceSlice = createSlice({
  name: "walletBalanceStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWalletBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getWalletBalance.fulfilled, (state, action) => {
        const { id, balance } = action.payload;
        state.id = id ?? "";
        state.balance = balance ?? 0;
        state.isLoading = false;
      })
      .addCase(getWalletBalance.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default walletBalanceSlice.reducer;

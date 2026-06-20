import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  data: [],
  error: null,
  isLoading: false,
  status: "",
  code: "",
};

export const getComplainReasons = createAsyncThunk(
  "order/complainOrder",
  async ({ orderId }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `/disputed-orders/complain-reasons?orderId=${orderId}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const complainReasonsSlice = createSlice({
  name: "complain-reasons",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getComplainReasons.pending, (state) => {
        state.isLoading = true;
        state.data = [];
        state.status = "";
        state.code = "";
      })
      .addCase(getComplainReasons.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.status = action.payload.status;
        state.code = action.payload.code;
        state.error = false;
      })
      .addCase(getComplainReasons.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;

        state.data = [];
        state.status = action?.payload?.response?.data?.status;
        state.code = action?.payload?.response?.data?.code;
      });
  },
});

export default complainReasonsSlice.reducer;

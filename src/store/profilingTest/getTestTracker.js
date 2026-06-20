// redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../config/api";

const initialState = {
  dataTestTracker: {},
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  errorCode: null,
  errorMessage: "",
};

export const getTestTracker = createAsyncThunk(
  "profiling/getTestTracker",
  /**
   *
   * @param {{
   * providerName : 'Grip Learning' || string
   * }} props
   * @returns
   */
  async ({ providerName }, { rejectWithValue }) => {
    try {
      const res = await API.get(
        `/parent/test-tracker?provider_name=${providerName}`
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getTestTrackerSlice = createSlice({
  name: "test-tracker",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTestTracker.pending, (state) => {
        state.status = "loading";
        state.dataTestTracker = {};
        state.errorCode = null;
        state.errorMessage = "";
      })
      .addCase(getTestTracker.fulfilled, (state, { payload }) => {
        const dataTestTracker = {
          availableTest: payload.data.availableTest,
          assignedTest: payload.data.assignedTest,
          expiredTest: payload.data.expiredTest,
        };

        state.dataTestTracker = dataTestTracker;
        state.status = "succeeded";
      })
      .addCase(getTestTracker.rejected, (state, { payload }) => {
        const { message, response } = payload;

        const errorCode = response?.status || response?.data?.code;
        const errorMessage = response?.data?.message || message;

        state.status = "failed";
        state.errorCode = errorCode;
        state.errorMessage = errorMessage;
      });
  },
});

export default getTestTrackerSlice.reducer;

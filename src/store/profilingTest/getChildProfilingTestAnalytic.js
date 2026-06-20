import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";
import { API_FETCH_STATUS } from "../../constants/api";

const initialState = {
  analyticsResults: false,
  status: API_FETCH_STATUS.IS_IDLE,
  childrenIdResult: null,
  errorMessage: null,
  errorCode: null,
};

export const getChildProfilingTestAnalytic = createAsyncThunk(
  "profilingTest/getChildProfilingTestAnalytic",

  /**
   * @param {{
   * childrenId : string
   * }} param0
   *
   * @param {{
   * rejectWithValue : () => void
   * }} param1
   */
  async ({ childrenId }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `children/${childrenId}/profiling-test-analytic`
      );

      return {
        childrenId,
        dataResults: response.data.data,
        code: response.data.code,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getChildProfilingTestAnalyticSlice = createSlice({
  name: "childProfilingTestAnalytic",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChildProfilingTestAnalytic.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.errorMessage = null;
        state.errorCode = null;
      })
      .addCase(getChildProfilingTestAnalytic.fulfilled, (state, action) => {
        state.analyticsResults = action.payload.dataResults;
        state.childrenIdResult = action.payload.childrenId;
        state.status = API_FETCH_STATUS.IS_SUCCESS;
        state.errorCode = action.payload.code;
      })
      .addCase(getChildProfilingTestAnalytic.rejected, (state, action) => {
        state.status = API_FETCH_STATUS.IS_FAILED;
        state.analyticsResults = false;
        state.errorMessage =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.errorCode = action?.payload?.response?.data?.code;
      });
  },
});

export default getChildProfilingTestAnalyticSlice.reducer;

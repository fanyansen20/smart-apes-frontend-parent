import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../config/api";
import { API_FETCH_STATUS } from "../../constants/api";

const initialState = {
  summaryResults: {},
  status: API_FETCH_STATUS.IS_IDLE,
  error: null,
  statusCode: null,
  resultReferenceId: null,
};

export const getChildrenSummaryTest = createAsyncThunk(
  "profilingTest/getChildrenSummaryTest",

  /**
   *
   * @param {{
   * childrenId : string
   * referenceId : string
   * }} param0
   * @param {{
   * rejectWithValue : () => void
   * }} param1
   */
  async ({ childrenId, referenceId }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `children/${childrenId}/assigned-profiling-tests/${referenceId}/summary`
      );

      return {
        referenceId,
        resultData: response.data.data,
        code: response.data.code,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getChildrenSummaryTestSlice = createSlice({
  name: "childrenSummaryTest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getChildrenSummaryTest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getChildrenSummaryTest.fulfilled, (state, action) => {
        state.summaryResults = action.payload.resultData;
        state.statusCode = action?.payload?.code;

        state.resultReferenceId = action.payload.referenceId;
        state.status = "succeeded";
      })
      .addCase(getChildrenSummaryTest.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = "failed";
        state.statusCode = action?.payload?.response?.status;
        state.resultReferenceId = null;
      });
  },
});

export default getChildrenSummaryTestSlice.reducer;

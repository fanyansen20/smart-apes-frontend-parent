import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../config/api";

const initialState = {
  assignHistoryData: [],
  totalResults: 0,
  totalPages: 0,
  page: 1,
  status: "idle",
  error: null,
};

export const getAssignedProfilingTestHistory = createAsyncThunk(
  "profilingTest/getAssignedProfilingTestHistory",

  /**
   * @param {{
   * childId : string
   * page : number
   * limit : number
   * }} props
   */
  async ({ childId, page = 1, limit = 10 }, { rejectWithValue }) => {
    const params = new URLSearchParams();
    params.append("page", page);
    params.append("limit", limit);

    try {
      const response = await API.get(
        `children/${childId}/assigned-profiling-test-history?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAssignedProfilingTestHistorySlice = createSlice({
  name: "assignHistoryProfilingTestHistory",
  initialState,
  reducers: {
    handleChangePage: (state, { payload }) => {
      state.page = payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAssignedProfilingTestHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAssignedProfilingTestHistory.fulfilled, (state, action) => {
        state.assignHistoryData = action.payload.data.results;
        state.totalResults = action.payload.data.totalResults;
        state.totalPages = action.payload.data.totalPages;
        state.page = action.payload.data.page;
        state.status = "succeeded";
      })
      .addCase(getAssignedProfilingTestHistory.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = "failed";
      });
  },
});

export const { handleChangePage } =
  getAssignedProfilingTestHistorySlice.actions;

export default getAssignedProfilingTestHistorySlice.reducer;

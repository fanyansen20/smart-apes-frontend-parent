import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../config/api";

// constant
import { API_FETCH_STATUS } from "../../constants/api";

const initialState = {
  status: API_FETCH_STATUS.IS_IDLE,
  error: null,
  dataCountProfilingTests: 0,
  childrenId: "",
};

export const getCountProfilingTest = createAsyncThunk(
  "profilingTest/getCountProfilingTest",

  /**
   *
   * @param {{
   *  childId : string
   *  status : 'Pending' | 'Complete'
   *  providerName : 'Grip Learning'
   *  testName : 'Profiling Test Basic' | 'Profiling Test Premium' | 'Profiling Test Premium Plus '
   * }} props1
   * @returns
   */
  async (
    { childId, status, providerName = "Grip Learning", testName },
    { rejectWithValue }
  ) => {
    const params = new URLSearchParams();
    params.append("status", status);
    params.append("providerName", providerName);
    params.append("testName", testName);
    try {
      const res = await API.get(
        `children/${childId}/count-profiling-tests?${params.toString()}`
      );

      return { data: res.data, childId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getCountProfilingTestSlice = createSlice({
  name: "countProfilingTest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCountProfilingTest.pending, (state) => {
        state.status = API_FETCH_STATUS.IS_LOADING;
        state.error = null;
      })
      .addCase(getCountProfilingTest.fulfilled, (state, action) => {
        state.dataCountProfilingTests = action.payload.data.data;
        state.childrenId = action.payload.childId;
        state.status = API_FETCH_STATUS.IS_SUCCESS;
      })
      .addCase(getCountProfilingTest.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = API_FETCH_STATUS.IS_FAILED;
      });
  },
});

export default getCountProfilingTestSlice.reducer;

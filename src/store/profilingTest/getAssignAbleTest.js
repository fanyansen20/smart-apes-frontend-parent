import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../config/api";

const initialState = {
  assignAbleData: [],
  status: "idle",
  error: null,
};

export const getAssignAbleTest = createAsyncThunk(
  "profilingTestProduct/getAssignAbleTest",

  /**
   * @param {{
   * providerName : 'Grip Learning' || string
   * }} props
   */
  async ({ providerName }, { rejectWithValue }) => {
    try {
      const response = await API.get(
        `parent/assignable-profiling-tests?provider_name=${providerName}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAssignAbleTestSlice = createSlice({
  name: "assignAbleTest",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAssignAbleTest.pending, (state) => {
        state.assignAbleData = [];
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAssignAbleTest.fulfilled, (state, action) => {
        const resAssignAbleData = action.payload.data.map((value) => {
          return {
            ...value,
            package: `${value.providerName} ${value.name}`,
          };
        });

        state.assignAbleData = resAssignAbleData;
        state.status = "succeeded";
      })
      .addCase(getAssignAbleTest.rejected, (state, action) => {
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.status = "failed";
      });
  },
});

export default getAssignAbleTestSlice.reducer;

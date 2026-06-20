// redux
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// helper
import { API } from "../../config/api";

const initialState = {
  children: [],
  totalResults: 0,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  errorCode: null,
  errorMessage: "",
};

export const getAllChildren = createAsyncThunk(
  "children/getAllChildren",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/children?limit=50`);

      const childrenData = data.results.map((item) => {
        return {
          ...item,
          name: item.full_name,
          avatar: item.profile_pic,
          url: `/children/${item.id}`,
        };
      });

      return { childrenData, totalResults: data.total_results };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const getAllChildrenSlice = createSlice({
  name: "children",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllChildren.pending, (state) => {
        state.status = "loading";
        state.errorCode = null;
        state.errorMessage = "";
      })
      .addCase(getAllChildren.fulfilled, (state, action) => {
        const { totalResults, childrenData } = action.payload;

        state.totalResults = totalResults;
        state.children = childrenData;
        state.status = "succeeded";
        state.errorCode = null;
        state.errorMessage = "";
      })
      .addCase(getAllChildren.rejected, (state, action) => {
        const { message, response } = action.payload;

        const errorCode = response?.status || response?.data?.code;
        const errorMessage = response?.data?.message || message;

        state.totalResults = 0;
        state.status = "failed";
        state.errorCode = errorCode;
        state.errorMessage = errorMessage;
      });
  },
});

export default getAllChildrenSlice.reducer;

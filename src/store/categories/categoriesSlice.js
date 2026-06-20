import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

// Auth state
const initialState = {
  isLoading: false,
  dataCategories: "",
  error: "",
};

export const getCategoriesData = createAsyncThunk(
  "categories/getCategoriesData",
  async (_arg, thunkAPI) => {
    try {
      const response = await API.get(`/categories?pretty=true`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categoriesStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesData.pending, (state) => {
        state.isLoading = true;
        state.isData = false;
        state.error = "";
      })
      .addCase(getCategoriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isData = true;
        state.dataCategories = action.payload;
      })
      .addCase(getCategoriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.isData = true;
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
      });
  },
});

export default categoriesSlice.reducer;

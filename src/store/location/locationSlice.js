import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  dataLocation: "",
  isLoading: true,
};

export const getLocation = createAsyncThunk(
  "user/getLocation",
  async (name, thunkAPI) => {
    try {
      const res = await API.get(`/locations/countries`);
      const dataLocation = res.data.results;

      return dataLocation;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const locationSlice = createSlice({
  name: "locationStore",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      state.dataLocation = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataLocation = action.payload;
      })
      .addCase(getLocation.rejected, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

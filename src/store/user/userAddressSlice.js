import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const initialState = {
  userAddressData: "",
  isLoading: false,
};

export const getUserAddress = createAsyncThunk(
  "user/getUserAddress",
  async ({ page, limit }, thunkApi) => {
    try {
      const userId = cookies.get("parent_id");
      const { data } = await API.get(
        `/users/${userId}/addresses?page=${page}&limit=${limit}`
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const userAddress = createSlice({
  name: "userAddresses",
  initialState,
  reducers: {
    setAddresses: (state, action) => {
      state.userAddressData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        const { results } = action.payload;

        state.userAddressData = results;
      })
      .addCase(getUserAddress.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setAddresses } = userAddress.actions;

export default userAddress.reducer;

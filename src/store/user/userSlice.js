import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie/cjs/Cookies";
import { API } from "../../config/api";

const cookies = new Cookies();

const initialState = {
  userData: "",
  isLoading: false,
};

export const getProfile = createAsyncThunk(
  "user/getProfile",
  async (name, thunkAPI) => {
    try {
      const userId = cookies.get("parent_id");
      const response = await API.get(`/users/${userId}`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const handleLogoutRedux = createAsyncThunk(
  "user/handleLogoutRedux",
  async function (_payload, thunkAPI) {
    thunkAPI.dispatch({ type: "logout/LOGOUT" });
  }
);

const userSlice = createSlice({
  name: "userStore",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setProfile } = userSlice.actions;

export default userSlice.reducer;

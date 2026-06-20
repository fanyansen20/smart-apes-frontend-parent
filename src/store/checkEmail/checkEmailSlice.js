import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const GET_URL = (email) => `shop-users/email/${email}`;

const initialState = {
  initEmail: "",
  currentEmail: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  message: undefined,
  success: false,
  error: null,
};

export const fetchEmailCheck = createAsyncThunk(
  "users/fetchEmailCheck",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await API.get(GET_URL(email));
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const emailCheckSlice = createSlice({
  name: "emailCheck",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    },
    resetCurrentEmailState: (state) => {
      state.currentEmail = [];
    },
    setInitEmail: (state, action) => {
      state.initEmail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmailCheck.pending, (state, action) => {
        state.status = "loading";
        if (!state.currentEmail.includes(action.meta.arg?.email))
          state.currentEmail.push(action.meta.arg?.email);
        state.success = false;
        state.message = null;
      })
      .addCase(fetchEmailCheck.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload && "Email is already taken";
        state.success = !action.payload;
      })
      .addCase(fetchEmailCheck.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action?.payload?.response?.data?.message || action?.payload?.message;
        state.success = false;
        state.message = null;
      });
  },
});

export const {
  resetStatus,
  resetMessage,
  resetCurrentEmailState,
  setInitEmail,
} = emailCheckSlice.actions;

export default emailCheckSlice.reducer;

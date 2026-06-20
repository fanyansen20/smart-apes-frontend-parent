import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie/cjs/Cookies";
import { API } from "../../config/api";

const cookies = new Cookies();

// Auth State
const initialState = {
  status: "",
  memberType: "",
  startDate: "",
  endDate: "",
  numberOfPurchase: 0,
  totalPaid: 0,
  isLoading: false,
  error: "",
};

/**
 *Get membership data for navbar
 *param is an object of {userId, accessToken}
 *@param {string} userId - marketplace logged in user id
 *@param {string} accessToken - jwt session access token
 */
export const getMembershipData = createAsyncThunk(
  "membership/getMembershipData",
  async (thunkAPI) => {
    try {
      const userId = cookies.get("parent_id");
      const response = await API.get(`/users/${userId}/membership`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.response.data.message);
    }
  }
);

const membershipSlice = createSlice({
  name: "membershipStore",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getMembershipData.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getMembershipData.fulfilled, (state, action) => {
        state.isLoading = false;
        const {
          status,
          start_date,
          end_date,
          number_of_purchase,
          tier,
          total_paid,
        } = action.payload;
        state.status = status ?? "INACTIVE";
        state.memberType = tier ?? "";
        state.startDate = start_date ?? "";
        state.endDate = end_date ?? "";
        state.numberOfPurchase = number_of_purchase ?? 0;
        state.totalPaid = total_paid ?? 0;
      })
      .addCase(getMembershipData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default membershipSlice.reducer;

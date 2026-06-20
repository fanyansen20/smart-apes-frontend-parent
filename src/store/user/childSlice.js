import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "../../config/api";

const initialState = {
  childData: "",
  isLoading: true,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

export const getChildrenProfile = createAsyncThunk(
  "user/getChildrenProfile",

  /**
   * @param {string} childrenId
   * @returns
   */
  async (childrenId, thunkAPI) => {
    try {
      const res = await API.get(`/children/${childrenId}`);

      let profileData = {
        ...res.data,
        level: res.data.school_education_category
          ? res.data.school_education_category
          : "-",
      };
      return profileData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const childSlice = createSlice({
  name: "childStore",
  initialState,
  reducers: {
    setChildProfile: (state, action) => {
      state.childData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChildrenProfile.pending, (state) => {
        state.isLoading = true;
        state.status = "loading";
        state.childData = "";
      })
      .addCase(getChildrenProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.childData = action.payload;
        state.status = "succeeded";
      })
      .addCase(getChildrenProfile.rejected, (state) => {
        state.status = "failed";
        state.isLoading = false;
      });
  },
});

export const { setChildProfile } = childSlice.actions;

export default childSlice.reducer;

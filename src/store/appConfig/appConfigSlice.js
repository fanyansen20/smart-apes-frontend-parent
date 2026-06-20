import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  language: "english",
  country: "singapore",
};

const appConfig = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload;
    },
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
    changeCountry: (state, action) => {
      state.country = action.payload;
    },
  },
});

export const { changeTheme, changeLanguage, changeCountry } = appConfig.actions;

export default appConfig.reducer;

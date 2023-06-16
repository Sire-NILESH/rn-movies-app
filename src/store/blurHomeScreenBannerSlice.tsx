import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { blurBannerSettingInitialState } from "../config/blurHomeScreenBanner";

// Define the initial state
const initialState = blurBannerSettingInitialState;

// Create the Slice
const blurHomeScreenBannerSlice = createSlice({
  name: "blurHomeScreenBanner",
  initialState: initialState,
  reducers: {
    toggleBlurHomeScreenBanner: (state, action: PayloadAction) => {
      //   set a action payload directly on the state object
      state.blur = !state.blur;
    },
  },
});

export const { toggleBlurHomeScreenBanner } = blurHomeScreenBannerSlice.actions;

const blurHomeScreenBannerReducer = blurHomeScreenBannerSlice.reducer;
export default blurHomeScreenBannerReducer;

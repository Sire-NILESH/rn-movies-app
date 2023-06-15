import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface BlurHomeScreenBannerPermission {
  blur: boolean;
}

// Define the initial state using that type
const initialState: BlurHomeScreenBannerPermission = {
  blur: false,
};

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

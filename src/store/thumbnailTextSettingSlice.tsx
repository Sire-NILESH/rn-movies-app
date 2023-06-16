import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { disableThumbnailTxtInitialState } from "../config/disableThumbnailText";

// Define the initial state
const initialState = disableThumbnailTxtInitialState;

// Create the Slice
const thumbnailTextSettingSlice = createSlice({
  name: "thumbnailTextSetting",
  initialState: initialState,
  reducers: {
    toggleThumbnailText: (state, action: PayloadAction) => {
      //   set a action payload directly on the state object
      state.disable = !state.disable;
    },
  },
});

export const { toggleThumbnailText } = thumbnailTextSettingSlice.actions;

const thumbnailTextSettingReducer = thumbnailTextSettingSlice.reducer;
export default thumbnailTextSettingReducer;

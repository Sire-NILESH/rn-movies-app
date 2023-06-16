import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { nsfwSettingInitialState } from "../config/allowNsfw";

// Define the initial state
const initialState = nsfwSettingInitialState;

// Create the Slice
const allowNsfwContentSlice = createSlice({
  name: "allowNsfw",
  initialState: initialState,
  reducers: {
    toggleAllowNsfwContent: (state, action: PayloadAction) => {
      //   set a action payload directly on the state object
      state.nsfw = !state.nsfw;
    },
  },
});

export const { toggleAllowNsfwContent } = allowNsfwContentSlice.actions;

const allowNsfwContentReducer = allowNsfwContentSlice.reducer;
export default allowNsfwContentReducer;
